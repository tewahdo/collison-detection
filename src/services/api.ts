
import { supabase } from "@/integrations/supabase/client";
import type {
  Submission,
  SubmissionFormData,
  ApiResponse,
  SubmissionStatus,
} from "@/types/submission";

function mapRow(row: any): Submission {
  return {
    id: row.id,
    sectorName: row.sector_name,
    sectorType: row.sector_type,
    coordinates:
      row.latitude && row.longitude
        ? [{ lat: row.latitude, lng: row.longitude }]
        : [],
    metadata: row.metadata ?? {},
    status: row.status,
    hasCollision: row.has_collision,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
  };
}

export async function submitSector(
  data: SubmissionFormData,
): Promise<ApiResponse<Submission>> {
  try {
    const first = data.coordinates?.[0];

    if (!first) {
      return { success: false, error: "No location selected" };
    }

    // 🔥 collision check
    const { data: collisionData, error: collisionError } = await supabase.rpc(
      "check_collision",
      {
        lat: first.lat,
        lon: first.lng,
      },
    );

    if (collisionError) {
      return { success: false, error: collisionError.message };
    }

    const { data: row, error } = await supabase
      .from("submissions")
      .insert({
        sector_name: data.sector_name, // ✅ FIXED
        sector_type: data.sector_type, // ✅ FIXED
        latitude: first.lat,
        longitude: first.lng,
        metadata: data.metadata ?? {},
        status: "pending",
        has_collision: collisionData ?? false,
      })
      .select()
      .single();

    if (error || !row) {
      return { success: false, error: error?.message };
    }

    return { success: true, data: mapRow(row) };
  } catch {
    return { success: false, error: "Unexpected error" };
  }
}

export async function getSubmissions(): Promise<ApiResponse<Submission[]>> {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    data: (data ?? []).map(mapRow),
  };
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  message?: string,
): Promise<ApiResponse<Submission>> {
  const { data, error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    return { success: false, error: error?.message };
  }

  return { success: true, data: mapRow(data) };
}

export async function notifySector(id: string) {
  console.log("Notify manager for submission:", id);

//   // later you can connect real notification system
   return { success: true };
 }







// import { supabase } from "@/integrations/supabase/client";
// import type {
//   Submission,
//   SubmissionFormData,
//   ApiResponse,
//   SubmissionStatus,
// } from "@/types/submission";

// /**
//  * Convert coordinate array to WKT geometry string for PostGIS
//  */
// function coordinatesToWKT(coordinates: { lat: number; lng: number }[]): string {
//   if (coordinates.length === 1) {
//     return `SRID=4326;POINT(${coordinates[0].lng} ${coordinates[0].lat})`;
//   }
//   if (coordinates.length === 2) {
//     const line = coordinates.map((c) => `${c.lng} ${c.lat}`).join(",");
//     return `SRID=4326;LINESTRING(${line})`;
//   }
//   // 3+ points: create polygon (close the ring)
//   const pts = [...coordinates, coordinates[0]];
//   const ring = pts.map((c) => `${c.lng} ${c.lat}`).join(",");
//   return `SRID=4326;POLYGON((${ring}))`;
// }

// /**
//  * Map a Supabase row to our Submission type
//  */
// function mapRow(row: any): Submission {
//   return {
//     id: row.id,
//     sectorName: row.sectorname,
//     sectorType: row.sector_type,
//     coordinates: row.coordinates as { lat: number; lng: number }[],
//     metadata: (row.metadata ?? {}) as Record<string, string>,
//     status: row.status,
//     hasCollision: row.has_collision,
//     collisionDetails: row.collision_details ?? undefined,
//     submittedAt: row.submitted_at,
//     updatedAt: row.updated_at,
//     managerMessage: row.manager_message ?? undefined,
//   };
// }

// /**
//  * POST /api/submissions
//  * Saves submission and checks for collision using PostGIS ST_Intersects
//  */
// export async function submitSector(
//   data: SubmissionFormData,
// ): Promise<ApiResponse<Submission>> {
//   const wkt = coordinatesToWKT(data.coordinates);

//   // Get current user
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Check collision first using the database function
//   const { data: collisionData, error: collisionError } = await supabase.rpc(
//     "check_collision",
//     { new_geom: wkt },
//   );

//   const hasCollision = collisionData?.[0]?.has_collision ?? false;
//   const collisionDetails = collisionData?.[0]?.collision_details ?? undefined;

//   // Insert the submission
//   const { data: row, error } = await supabase
//     .from("submissions")
//     .insert({
//       sector_name: data.sectorName,
//       sector_type: data.sectorType,
//       geometry: wkt,
//       coordinates: data.coordinates as any,
//       metadata: data.metadata as any,
//       has_collision: hasCollision,
//       collision_details: collisionDetails ?? null,
//       user_id: user?.id,
//     })
//     .select()
//     .single();

//   if (error || !row) {
//     console.error("Insert error:", error);
//     return {
//       success: false,
//       error: error?.message ?? "Failed to insert submission",
//     };
//   }

//   return { success: true, data: mapRow(row) };
// }

// /**
//  * GET /api/submissions
//  */
// export async function getSubmissions(): Promise<ApiResponse<Submission[]>> {
//   const { data: rows, error } = await supabase
//     .from("submissions")
//     .select("*")
//     .order("submitted_at", { ascending: false });

//   if (error) {
//     console.error("Fetch error:", error);
//     return { success: false, error: error.message };
//   }

//   return { success: true, data: (rows ?? []).map(mapRow) };
// }

// /**
//  * PATCH /api/submissions/:id/status
//  */
// export async function updateSubmissionStatus(
//   id: string,
//   status: SubmissionStatus,
//   message?: string,
// ): Promise<ApiResponse<Submission>> {
//   const updateData: any = { status };
//   if (message) updateData.manager_message = message;

//   const { data: row, error } = await supabase
//     .from("submissions")
//     .update(updateData)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error || !row) {
//     return { success: false, error: error?.message ?? "Submission not found" };
//   }

//   return { success: true, data: mapRow(row) };
// }

// /**
//  * POST /api/submissions/:id/notify
//  */
// export async function notifySector(
//   id: string,
//   message: string,
// ): Promise<ApiResponse<null>> {
//   // Store the message on the submission
//   const { error } = await supabase
//     .from("submissions")
//     .update({ manager_message: message })
//     .eq("id", id);

//   if (error) {
//     return { success: false, error: error.message };
//   }

//   console.log(
//     `[API] Notification sent to sector for submission ${id}: ${message}`,
//   );
//   return { success: true };
// }
