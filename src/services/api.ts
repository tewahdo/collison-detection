// import { supabase } from "@/integrations/supabase/client";
// import type {
//   Submission,
//   SubmissionFormData,
//   ApiResponse,
//   SubmissionStatus,
// } from "@/types/submission";

// // -----------------------------
// // SAFE ROW MAPPER
// // -----------------------------
// function mapRow(row: any): Submission {
//   return {
//     id: row.id,
//     sectorName: row.sector_name,
//     sectorType: row.sector_type,
//     coordinates:
//       row.latitude != null && row.longitude != null
//         ? [{ lat: row.latitude, lng: row.longitude }]
//         : [],
//     metadata: row.metadata ?? {},
//     status: row.status,
//     hasCollision: row.has_collision,
//     submittedAt: row.submitted_at,
//     updatedAt: row.updated_at,
//   };
// }

// // -----------------------------
// // MAIN SUBMIT FUNCTION
// // -----------------------------
// export async function submitSector(
//   data: SubmissionFormData,
// ): Promise<ApiResponse<Submission>> {
//   try {
//     const first = data.coordinates?.[0];

//     if (!first) {
//       return { success: false, error: "No location selected" };
//     }

//     // -----------------------------
//     // 1. COLLISION CHECK (SAFE)
//     // -----------------------------
//     const { data: collisionData, error: collisionError } =
//       await supabase.rpc("check_collision", {
//         lat: first.lat,
//         lon: first.lng,
//       });

//     if (collisionError) {
//       console.error("Collision RPC ERROR:", collisionError);
//       return { success: false, error: collisionError.message };
//     }

//     // FIX: ensure boolean
//     const hasCollision = Boolean(collisionData);

//     // -----------------------------
//     // 2. BLOCK IF COLLISION
//     // -----------------------------
//     if (hasCollision) {
//       return {
//         success: false,
//         error: "❌ Collision detected at this location",
//       };
//     }

//     // -----------------------------
//     // 3. INSERT (SAFE + LOGGED)
//     // -----------------------------
//     const insertPayload = {
//       sector_name: data.sectorName,
//       sector_type: data.sectorType,
//       latitude: first.lat,
//       longitude: first.lng,
//       metadata: data.metadata ?? {},
//       status: "pending",
//       has_collision: false,
//     };

//     const { data: row, error } = await supabase
//       .from("submissions")
//       .insert(insertPayload)
//       .select()
//       .single();

//     if (error) {
//       console.error("INSERT ERROR:", error);
//       return { success: false, error: error.message };
//     }

//     if (!row) {
//       return { success: false, error: "Insert failed (no row returned)" };
//     }

//     return {
//       success: true,
//       data: mapRow(row),
//     };
//   } catch (err: any) {
//     console.error("Unexpected error:", err);
//     return {
//       success: false,
//       error: err?.message || "Unexpected error",
//     };
//   }
// }

// // -----------------------------
// // GET SUBMISSIONS
// // -----------------------------
// export async function getSubmissions(): Promise<ApiResponse<Submission[]>> {
//   const { data, error } = await supabase
//     .from("submissions")
//     .select("*")
//     .order("submitted_at", { ascending: false });

//   if (error) {
//     return { success: false, error: error.message };
//   }

//   return {
//     success: true,
//     data: (data ?? []).map(mapRow),
//   };
// }

// // -----------------------------
// // UPDATE STATUS
// // -----------------------------
// export async function updateSubmissionStatus(
//   id: string,
//   status: SubmissionStatus,
//   message?: string,
// ): Promise<ApiResponse<Submission>> {
//   const { data, error } = await supabase
//     .from("submissions")
//     .update({
//       status,
//     })
//     .eq("id", id)
//     .select()
//     .single();

//   if (error || !data) {
//     return {
//       success: false,
//       error: error?.message || "Update failed",
//     };
//   }

//   return {
//     success: true,
//     data: mapRow(data),
//   };
// }

// // -----------------------------
// // NOTIFICATION (placeholder)
// // -----------------------------
// export async function notifySector(id: string) {
//   console.log("Notify manager for submission:", id);
//   return { success: true };
// }




import { supabase } from "@/integrations/supabase/client";

import type {
  Submission,
  SubmissionFormData,
  ApiResponse,
  SubmissionStatus,
} from "@/types/submission";

// -----------------------------
// ROW MAPPER (SAFE)
// -----------------------------
function mapRow(row: any): Submission {
  return {
    id: row.id,
    sectorName: row.sector_name,
    sectorType: row.sector_type,
    coordinates: [
      {
        lat: row.latitude,
        lng: row.longitude,
      },
    ],
    metadata: row.metadata ?? {},
    status: row.status,
    hasCollision: row.has_collision,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
  };
}

// -----------------------------
// COLLISION CHECK (SAFE)
// -----------------------------
async function checkCollision(lat: number, lng: number) {
  const { data, error } = await supabase.rpc("check_collision", {
    lat,
    lon: lng,
  });

  if (error) {
    console.error("Collision RPC error:", error);
    return false;
  }

  return Boolean(data);
}

// -----------------------------
// SUBMIT SECTOR (FIXED)
// // -----------------------------
export async function submitSector(
  data: SubmissionFormData,
): Promise<ApiResponse<Submission>> {
  try {
    const first = data.coordinates?.[0];

    if (!first) {
      return { success: false, error: "No location selected" };
    }

    // 1. collision check
    const hasCollision = await checkCollision(first.lat, first.lng);

    if (hasCollision) {
      return {
        success: false,
        error: "❌ Collision detected at this location",
      };
    }

    // 2. insert
    const { data: row, error } = await supabase
      .from("submissions")
      .insert({
        sector_name: data.sectorName,
        sector_type: data.sectorType,
        latitude: first.lat,
        longitude: first.lng,
        metadata: data.metadata ?? {},
        status: "pending",
        has_collision: hasCollision,
      })
      .select()
      .single();

    if (error) {
      console.error("INSERT ERROR:", error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: mapRow(row),
    };
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return {
      success: false,
      error: err.message || "Unexpected error",
    };
  }
}


// -----------------------------
// GET SUBMISSIONS
// -----------------------------
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
export async function notifySector(
  id: string,
  message?: string,
): Promise<{ success: boolean }> {
  console.log("📢 Notify sector:", id, message);

  // later you can connect email / realtime / database messages
  return { success: true };
}
export async function updateSubmissionStatus(
  id: string,
  status: "approved" | "rejected",
  message?: string,
): Promise<ApiResponse<Submission>> {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .update({
        status,
        metadata: message ? { message } : undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("UPDATE ERROR:", error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: mapRow(data),
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Unexpected error",
    };
  }
}
// async function checkCollision(lat: number, lng: number) {
//   const { data, error } = await supabase.from("submissions").select("*");

//   if (error) {
//     console.error(error);
//     return { hasCollision: false, collidedWith: null };
//   }

//   const match = (data || []).find((item) => {
//     const dLat = Math.abs(item.latitude - lat);
//     const dLng = Math.abs(item.longitude - lng);

//     // collision radius (adjust if needed)
//     return dLat < 0.001 && dLng < 0.001;
//   });

//   if (match) {
//     return {
//       hasCollision: true,
//       collidedWith: match,
//     };
//   }

//   return {
//     hasCollision: false,
//     collidedWith: null,
//   };
// }

export async function getRecommendedLocation(lat: number, lng: number) {
  const { data, error } = await supabase.rpc("recommend_location", {
    lat,
    lon: lng,
  });

  if (error) {
    console.error("AI error:", error);
    return null;
  }

  return data?.[0] || null;
}



