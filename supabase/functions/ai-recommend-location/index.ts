import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface InfrastructurePoint {
  name: string;
  latitude: number;
  longitude: number;
}

interface InfrastructureLine {
  name: string;
  coordinates: unknown;
}

interface Submission {
  sector_name: string;
  sector_type: string;
  coordinates: unknown;
  collision_details?: string;
  status: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sectorType, coordinates } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableApiKey) {
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all submissions with collisions
    const { data: collisionSubmissions } = await supabase
      .from("submissions")
      .select(
        "sector_name, sector_type, coordinates, collision_details, status",
      )
      .eq("has_collision", true);

    // Fetch all approved submissions (occupied areas)
    const { data: approvedSubmissions } = await supabase
      .from("submissions")
      .select("sector_name, sector_type, coordinates, status")
      .eq("status", "approved");

    // Fetch all infrastructure data
    const [
      airports,
      powerPlants,
      substations,
      transformers,
      railways,
      roads,
      telecom,
      transmission,
    ] = await Promise.all([
      supabase.from("airports").select("name, latitude, longitude"),
      supabase.from("power_plants").select("name, latitude, longitude"),
      supabase.from("substations").select("name, latitude, longitude"),
      supabase.from("transformers").select("name, latitude, longitude"),
      supabase.from("railway_lines").select("name, coordinates"),
      supabase.from("roads").select("name, coordinates"),
      supabase.from("telecom_sites").select("name, coordinates"),
      supabase.from("transmission_lines").select("name, coordinates"),
    ]);

    const infraSummary = [
      ...(airports.data || []).map(
        (a: InfrastructurePoint) =>
          `- Airport: ${a.name} at (${a.latitude}, ${a.longitude})`,
      ),
      ...(powerPlants.data || []).map(
        (p: InfrastructurePoint) =>
          `- Power Plant: ${p.name} at (${p.latitude}, ${p.longitude})`,
      ),
      ...(substations.data || []).map(
        (s: InfrastructurePoint) =>
          `- Substation: ${s.name} at (${s.latitude}, ${s.longitude})`,
      ),
      ...(transformers.data || []).map(
        (t: InfrastructurePoint) =>
          `- Transformer: ${t.name} at (${t.latitude}, ${t.longitude})`,
      ),
      ...(railways.data || []).map(
        (r: InfrastructureLine) => `- Railway: ${r.name}`,
      ),
      ...(roads.data || []).map((r: InfrastructureLine) => `- Road: ${r.name}`),
      ...(telecom.data || []).map(
        (t: InfrastructureLine) => `- Telecom Site: ${t.name}`,
      ),
      ...(transmission.data || []).map(
        (t: InfrastructureLine) => `- Transmission Line: ${t.name}`,
      ),
    ].join("\n");

    const collisionSummary = (collisionSubmissions || [])
      .map(
        (s: Submission) =>
          `- ${s.sector_name} (${s.sector_type}) at coords ${JSON.stringify(s.coordinates)}: ${s.collision_details || "collision detected"}`,
      )
      .join("\n");

    const approvedSummary = (approvedSubmissions || [])
      .map(
        (s: Submission) =>
          `- ${s.sector_name} (${s.sector_type}) at coords ${JSON.stringify(s.coordinates)}`,
      )
      .join("\n");

    const userContext = coordinates
      ? `The user is considering coordinates: ${JSON.stringify(coordinates)}.`
      : "The user has not specified coordinates yet.";

    const sectorContext = sectorType
      ? `The sector type is: ${sectorType}.`
      : "No sector type specified.";

    const systemPrompt = `You are an expert geospatial advisor for a government infrastructure collision detection system in Ethiopia. Your role is to recommend the best location for new infrastructure sectors where no collision will occur.

Analyze the existing data and provide:
1. A recommended location (latitude, longitude) that avoids all existing collision zones
2. Why this location is optimal
3. Any risks or considerations
4. Alternative locations if available

Keep responses concise, professional, and actionable. Provide coordinates in decimal degrees format. Focus on Ethiopian geography (roughly lat 3-15, lng 33-48).`;

    const userPrompt = `${userContext}
${sectorContext}

Existing infrastructure (airports, power plants, substations, transformers, railways, roads, telecom, transmission lines):
${infraSummary || "No infrastructure data recorded yet."}

Existing collision zones:
${collisionSummary || "No collisions recorded yet."}

Approved/occupied areas:
${approvedSummary || "No approved submissions yet."}

Please recommend the best location for a new ${sectorType || "infrastructure"} sector that avoids ALL existing infrastructure within 50 meters. Provide specific coordinates and reasoning.`;

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

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please try again shortly." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const recommendation =
      aiData.choices?.[0]?.message?.content || "No recommendation available.";

    return new Response(JSON.stringify({ recommendation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
