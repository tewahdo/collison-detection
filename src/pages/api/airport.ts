import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/db";

// GET /api/airport?collision=true
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { collision } = req.query;

    if (collision === "true") {
      // Collision detection query
      const { data, error } = await supabase.rpc("check_airport_collisions"); // Create a stored function in Supabase
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    // Default: return all airports
    const { data, error } = await supabase.from("airports").select("*");
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
