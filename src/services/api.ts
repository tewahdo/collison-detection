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

// import { supabase } from "@/integrations/supabase/client";

// import type {
//   Submission,
//   SubmissionFormData,
//   ApiResponse,
//   SubmissionStatus,
// } from "@/types/submission";

// // -----------------------------
// // ROW MAPPER (SAFE)
// // -----------------------------
// function mapRow(row: any): Submission {
//   return {
//     id: row.id,
//     sectorName: row.sector_name,
//     sectorType: row.sector_type,
//     coordinates: [
//       {
//         lat: row.latitude,
//         lng: row.longitude,
//       },
//     ],
//     metadata: row.metadata ?? {},
//     status: row.status,
//     hasCollision: row.has_collision,
//     submittedAt: row.submitted_at,
//     updatedAt: row.updated_at,
//   };
// }

// // -----------------------------
// // COLLISION CHECK (SAFE)
// // -----------------------------
// async function checkCollision(lat: number, lng: number) {
//   const { data, error } = await supabase.rpc("check_collision", {
//     lat,
//     lon: lng,
//   });

//   if (error) {
//     console.error("Collision RPC error:", error);
//     return false;
//   }

//   return Boolean(data);
// }

// // -----------------------------
// // SUBMIT SECTOR (FIXED)
// // // -----------------------------
// export async function submitSector(
//   data: SubmissionFormData,
// ): Promise<ApiResponse<Submission>> {
//   try {
//     const first = data.coordinates?.[0];

//     if (!first) {
//       return { success: false, error: "No location selected" };
//     }

//     // 1. collision check
//     const hasCollision = await checkCollision(first.lat, first.lng);

//     if (hasCollision) {
//       return {
//         success: false,
//         error: "❌ Collision detected at this location",
//       };
//     }

//     // 2. insert
//     const { data: row, error } = await supabase
//       .from("submissions")
//       .insert({
//         sector_name: data.sectorName,
//         sector_type: data.sectorType,
//         latitude: first.lat,
//         longitude: first.lng,
//         metadata: data.metadata ?? {},
//         status: "pending",
//         has_collision: hasCollision,
//       })
//       .select()
//       .single();

//     if (error) {
//       console.error("INSERT ERROR:", error);
//       return { success: false, error: error.message };
//     }

//     return {
//       success: true,
//       data: mapRow(row),
//     };
//   } catch (err: any) {
//     console.error("Unexpected error:", err);
//     return {
//       success: false,
//       error: err.message || "Unexpected error",
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
// export async function notifySector(
//   id: string,
//   message?: string,
// ): Promise<{ success: boolean }> {
//   console.log("📢 Notify sector:", id, message);

//   // later you can connect email / realtime / database messages
//   return { success: true };
// }
// export async function updateSubmissionStatus(
//   id: string,
//   status: "approved" | "rejected",
//   message?: string,
// ): Promise<ApiResponse<Submission>> {
//   try {
//     const { data, error } = await supabase
//       .from("submissions")
//       .update({
//         status,
//         metadata: message ? { message } : undefined,
//         updated_at: new Date().toISOString(),
//       })
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) {
//       console.error("UPDATE ERROR:", error);
//       return { success: false, error: error.message };
//     }

//     return {
//       success: true,
//       data: mapRow(data),
//     };
//   } catch (err: any) {
//     return {
//       success: false,
//       error: err.message || "Unexpected error",
//     };
//   }
// }

// export async function getRecommendedLocation(lat: number, lng: number) {
//   const { data, error } = await supabase.rpc("recommend_location", {
//     lat,
//     lon: lng,
//   });

//   if (error) {
//     console.error("AI error:", error);
//     return null;
//   }

//   return data?.[0] || null;
// }

// async function checkCollision(lat: number, lng: number) {
//   const { data, error } = await supabase.rpc("check_collision", {
//     lat,
//     lon: lng,
//   });

//   if (error) return { hasCollision: false };

//   return data?.[0] || { hasCollision: false };
// }





















import { supabase } from "@/integrations/supabase/client";
import { ApiResponse, Submission } from "@/types/submission";

// -----------------------------
// MAP DATABASE ROW → FRONTEND MODEL
// -----------------------------
function mapRow(row: any): Submission {
  return {
    id: row.id,
    sectorName: row.sector_name,
    sectorType: row.sector_type,

    coordinates: row.latitude
      ? [{ lat: row.latitude, lng: row.longitude }]
      : [],

    metadata: row.metadata || {},
    status: row.status,
    hasCollision: row.has_collision,

    collisionDetails: row.metadata?.collision_source || "",

    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
  };
}

// -----------------------------
// COLLISION CHECK (RPC)
// -----------------------------
async function checkCollision(lat: number, lng: number) {
  const { data, error } = await supabase.rpc("check_collision", {
    lat,
    lon: lng,
  });

  if (error) {
    console.error("Collision RPC error:", error);
    return { has_collision: false, source: "none" };
  }

  return data?.[0] || { has_collision: false, source: "none" };
}

// -----------------------------
// SUBMIT SECTOR (USER)
// -----------------------------
export async function submitSector(data: any) {
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const first = data.coordinates?.[0];

  if (!first) {
    return { success: false, error: "No coordinates provided" };
  }

  const collision = await checkCollision(first.lat, first.lng);

  const { data: row, error } = await supabase
    .from("submissions")
    .insert({
      user_id: user.id,
      sector_name: data.sectorName,
      sector_type: data.sectorType,
      latitude: first.lat,
      longitude: first.lng,
      metadata: {
        collision_source: collision.source,
      },
      has_collision: collision.has_collision,
      status: "pending",
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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
}

// -----------------------------
// GET USER SUBMISSIONS (USER ONLY)
// -----------------------------
// export async function getUserSubmissions() {
//   const user = (await supabase.auth.getUser()).data.user;

//   if (!user) {
//     return { success: false, data: [] };
//   }

//   const { data, error } = await supabase
//     .from("submissions")
//     .select("*")
//     .eq("user_id", user.id)
//     .order("submitted_at", { ascending: false });

//   if (error) {
//     console.error("USER FETCH ERROR:", error);
//     return { success: false, data: [] };
//   }

//   return {
//     success: true,
//     data: (data || []).map(mapRow),
//   };
// }
export async function getUserSubmissions() {
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return { success: false, data: [] };
  }

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("user_id", user.id) // 🔥 THIS IS THE FIX
    .order("submitted_at", { ascending: false });

  if (error) {
    return { success: false, data: [] };
  }

  return {
    success: true,
    data,
  };
}
// -----------------------------
// GET ALL SUBMISSIONS (MANAGER)
// -----------------------------
export async function getSubmissions() {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("MANAGER FETCH ERROR:", error);
    return { success: false, data: [] };
  }

  return {
    success: true,
    data: (data || []).map(mapRow),
  };
}

// -----------------------------
// RECOMMENDED LOCATION (AI / RPC)
// -----------------------------
export async function getRecommendedLocation(lat: number, lng: number) {
  const { data, error } = await supabase.rpc("recommend_location", {
    lat,
    lon: lng,
  });

  if (error) {
    console.error("RECOMMEND ERROR:", error);
    return null;
  }

  if (!data || data.length === 0) return null;

  return data[0];
}

// -----------------------------
// UPDATE STATUS (MANAGER ACTION)
// -----------------------------
// export async function updateSubmissionStatus(
//   id: string,
//   status: "approved" | "rejected",
//   message?: string,
// ): Promise<ApiResponse<Submission>> {
//   try {
//     const { data, error } = await supabase
//       .from("submissions")
//       .update({
//         status,
//         metadata: message ? { message } : {},
//         updated_at: new Date().toISOString(),
//       })
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) {
//       console.error("UPDATE ERROR:", error);
//       return { success: false, error: error.message };
//     }

//     return {
//       success: true,
//       data: mapRow(data),
//     };
//   } catch (err: any) {
//     return {
//       success: false,
//       error: err.message || "Unexpected error",
//     };
//   }
// }
// export async function updateSubmissionStatus(id, status, message) {
//   const { data, error } = await supabase
//     .from("submissions")
//     .update({
//       status,
//       managerMessage: message,
//     })
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) throw error;

//   return { success: true, data };
// }
export async function updateSubmissionStatus(id, status, message) {
  const { data, error } = await supabase
    .from("submissions")
    .update({
      status,
      managerMessage: message,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  // 🔥 GET USER EMAIL
  const { data: user } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", data.user_id)
    .single();

  if (user?.email) {
    await fetch(
      "https://nyetklvkvgxftdhejigs.supabase.co/functions/v1/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          message: `Your submission is ${status.toUpperCase()}. Message: ${message}`,
        }),
      },
    );
  }

  return { success: true, data };
}
// -----------------------------
// NOTIFY SECTOR (OPTIONAL)
// -----------------------------
export async function notifySector(id: string, message?: string) {
  try {
    console.log("Notify sector:", id, message);

    // future: realtime / email / DB message
    return { success: true };
  } catch (err) {
    console.error("NOTIFY ERROR:", err);
    return { success: false };
  }
}

// export async function getGapLocation(
//   lat: number,
//   lng: number,
//   sectorType: string,
// ) {
//   const { data, error } = await supabase.rpc("gap_analysis", {
//     lat,
//     lon: lng,
//     sector: sectorType,
//   });

//   if (error) {
//     console.error("GAP ERROR:", error);
//     return null;
//   }

//   return data?.[0];
// }

export async function getGapLocation(lat, lng, sectorType) {
  const { data } = await supabase.rpc("gap_analysis", {
    lat,
    lng,
    sector_type: sectorType,
  });

  // if (!data || data.length === 0) {
  //   return {
  //     new_lat: lat + 0.01,
  //     new_lon: lng + 0.01,
  //   };
  // }
  if (!data?.length) {
  return {
    new_lat: lat + (Math.random() * 0.02),
    new_lon: lng + (Math.random() * 0.02),
  };
}

  return data[0];
}