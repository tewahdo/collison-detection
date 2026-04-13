import { createClient } from "@supabase/supabase-js";
import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { sectorType, coordinates } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      return new Response(JSON.stringify({ error: "Missing AI key" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // FETCH DATA
    const { data: collisions } = await supabase
      .from("submissions")
      .select("*")
      .eq("has_collision", true);

    const { data: approved } = await supabase
      .from("submissions")
      .select("*")
      .eq("status", "approved");

    // ⚠️ IMPORTANT FIX (avoid crash if empty)
    const collisionSummary = (collisions ?? [])
      .map((c) => `${c.sector_name} at ${JSON.stringify(c.coordinates)}`)
      .join("\n");

    const approvedSummary = (approved ?? [])
      .map((a) => `${a.sector_name} at ${JSON.stringify(a.coordinates)}`)
      .join("\n");

    const systemPrompt = `
You are a geospatial AI assistant for Ethiopia.
Return safe location suggestions avoiding collisions.
`;

    const userPrompt = `
Sector: ${sectorType}
Coordinates: ${JSON.stringify(coordinates)}

Collisions:
${collisionSummary || "NONE"}

Approved:
${approvedSummary || "NONE"}

Suggest best safe location with coordinates.
`;

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      },
    );

    const data = await aiResponse.json();

    return new Response(
      JSON.stringify({
        recommendation: data?.choices?.[0]?.message?.content || "No result",
      }),
      { headers: corsHeaders },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
