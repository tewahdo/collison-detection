// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { useState } from "react";
// import L from "leaflet";
// import { supabase } from "@/./integrations/supabase/client";

// // ✅ Fix Leaflet marker icon
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// interface Props {
//   onSelect: (lat: number, lng: number, collision: boolean) => void;
// }

// function ClickHandler({ onSelect }: Props) {
//   const [position, setPosition] = useState<[number, number] | null>(null);

//   useMapEvents({
//     async click(e) {
//       const { lat, lng } = e.latlng;
//       console.log("MAP CLICKED:", lat, lng); // 🔥 DEBUG

//       setPosition([lat, lng]);

//       // ✅ Call existing function (IMPORTANT FIX)
//       const { data, error } = await supabase.rpc("check_collision", {
//         lat,
//         lon: lng,
//       });

//       if (error) {
//         console.error("Collision error:", error);
//         return;
//       }

//       // onSelect(lat, lng, data);
//       onSelect(lat, lng, data ?? false);
//     },
//   });

//   return position ? <Marker position={position} /> : null;
// }

// export default function MapPicker({ onSelect }: Props) {
//   return (
//     <div style={{ height: "300px", width: "100%", zIndex: 0 }}>
//       <MapContainer
//         center={[8.98, 38.79]}
//         zoom={13}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           attribution="&copy; OpenStreetMap"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <ClickHandler onSelect={onSelect} />
//       </MapContainer>
//     </div>
//   );
// }

// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { useState } from "react";
// import L from "leaflet";
// import { supabase } from "@/integrations/supabase/client";
// import { getRecommendedLocation } from "@/services/api";
// import {getSubmission} from "@/service/api"

// // fix icon
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// interface Props {
//   onSelect: (lat: number, lng: number, collision: boolean) => void;
// }

// function ClickHandler({ onSelect }: Props) {
//   const [position, setPosition] = useState<[number, number] | null>(null);

//   useMapEvents({
//     // async click(e) {
//     //   const { lat, lng } = e.latlng;

//     //   setPosition([lat, lng]);

//     //   const { data, error } = await supabase.rpc("check_collision", {
//     //     lat,
//     //     lon: lng,
//     //   });

//     //   if (error) {
//     //     console.error(error);
//     //     return;
//     //   }

//     //   onSelect(lat, lng, Boolean(data));
//     // }
//     async click(e) {
//   const { lat, lng } = e.latlng;

//   setPosition([lat, lng]);

//   const { data: collision } = await supabase.rpc("check_collision", {
//     lat,
//     lon: lng,
//   });

//   // 🔥 AI RECOMMENDATION
//   const ai = await getRecommendedLocation(lat, lng);

//   console.log("AI Suggestion:", ai);

//   onSelect(lat, lng, collision ?? false, ai);
// }
//     ,
//   });

//   return position ? <Marker position={position} /> : null;
// }

// export default function MapPicker({ onSelect }: Props) {
//   return (
//     <div style={{ height: "300px", width: "100%" }}>
//       <MapContainer
//         center={[8.98, 38.79]}
//         zoom={13}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         <ClickHandler onSelect={onSelect} />
//       </MapContainer>
//     </div>
//   );
// }

// const handleMapClick = async (lat, lng) => {
//   const res = await getSubmissions();

//   const found = res.data?.find((item) => {
//     return (
//       Math.abs(item.latitude - lat) < 0.001 &&
//       Math.abs(item.longitude - lng) < 0.001
//     );
//   });

//   if (found) {
//     if (found.hasCollision) {
//       alert(
//         `⚠ Collision found!\nAlready used by: ${found.collision_info?.sector_name}`
//       );
//     } else {
//       alert(`✅ Safe location\nSector: ${found.sectorName}`);
//     }
//   }
// };

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Circle,
//   useMapEvents,
// } from "react-leaflet";
// import { useState } from "react";
// import L from "leaflet";
// import { supabase } from "@/integrations/supabase/client";
// import { getRecommendedLocation } from "@/services/api";

// // fix icon
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// interface Props {
//   onSelect: (
//     lat: number,
//     lng: number,
//     collision: boolean,
//     source?: string,
//     ai?: any,
//   ) => void;
// }

// function ClickHandler({ onSelect }: Props) {
//   const [position, setPosition] = useState<[number, number] | null>(null);
//   const [collisionZone, setCollisionZone] = useState<[number, number] | null>(
//     null,
//   );
//   const [aiPoint, setAiPoint] = useState<[number, number] | null>(null);

//   useMapEvents({
//     async click(e) {
//       const { lat, lng } = e.latlng;

//       setPosition([lat, lng]);

//       // ✅ collision check
//       const { data } = await supabase.rpc("check_collision", {
//         lat,
//         lon: lng,
//       });

//       const result = data?.[0];
//       const hasCollision = result?.has_collision ?? false;
//       const source = result?.source ?? "none";

//       if (hasCollision) {
//         setCollisionZone([lat, lng]);
//       } else {
//         setCollisionZone(null);
//       }

//       // ✅ AI suggestion
//       const ai = await getRecommendedLocation(lat, lng);

//       if (ai) {
//         setAiPoint([ai.new_lat, ai.new_lon]);
//       }

//       onSelect(lat, lng, hasCollision, source, ai);
//     },
//   });

//   return (
//     <>
//       {position && <Marker position={position} />}

//       {/* 🔴 collision area */}
//       {collisionZone && (
//         <Circle
//           center={collisionZone}
//           radius={500}
//           pathOptions={{ color: "red" }}
//         />
//       )}

//       {/* 🤖 AI suggestion */}
//       {aiPoint && <Marker position={aiPoint} />}
//     </>
//   );
// }

// export default function MapPicker({ onSelect }: Props) {
//   return (
//     <div style={{ height: "300px", width: "100%" }}>
//       <MapContainer
//         center={[8.98, 38.79]}
//         zoom={13}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           attribution="&copy; OpenStreetMap"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <ClickHandler onSelect={onSelect} />
//       </MapContainer>
//     </div>
//   );
// // }

// import { useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Circle,
//   useMapEvents,
// } from "react-leaflet";
// import { supabase } from "@/integrations/supabase/client";
// import { getRecommendedLocation } from "@/services/api";
// import L from "leaflet";

// export default function MapPicker({ onSelect }) {
//   const [position, setPosition] = useState(null);
//   const [collisionZone, setCollisionZone] = useState(null);
//   const [collisionSource, setCollisionSource] = useState("");
//   const [coords, setCoords] = useState(null);

//   // -------------------------
//   // CLICK HANDLER
//   // -------------------------
//   function ClickHandler() {
//     useMapEvents({
//       click: async (e) => {
//         const { lat, lng } = e.latlng;

//         setPosition([lat, lng]);
//         setCoords({ lat, lng });

//         const { data } = await supabase.rpc("check_collision", {
//           lat,
//           lon: lng,
//         });

//         const result = data?.[0] || {
//           has_collision: false,
//           source: "none",
//         };

//         setCollisionZone(result.has_collision ? [lat, lng] : null);
//         setCollisionSource(result.source);

//         onSelect(lat, lng, result.has_collision, result.source);
//       },
//     });

//     return null;
//   }

//   // -------------------------
//   // AI BUTTON
//   // -------------------------
//   // async function handleAIClick() {
//   //   if (!coords) {
//   //     alert("Click map first");
//   //     return;
//   //   }

//   //   const ai = await getRecommendedLocation(coords.lat, coords.lng);

//   //   if (!ai) {
//   //     alert("No AI suggestion found");
//   //     return;
//   //   }

//   //   alert(
//   //     `🤖 BEST LOCATION FOUND\n\nLatitude: ${ai.new_lat}\nLongitude: ${ai.new_lon}`,
//   //   );
//   // }
// async function handleAIClick() {
//   if (!coords) {
//     alert("Click map first");
//     return;
//   }

//   const ai = await getRecommendedLocation(coords.lat, coords.lng);

//   if (!ai) {
//    alert(
//      `🤖 Smart Recommendation:\n\nSafe Location Found ✅\n\nLat: ${ai.new_lat}\nLng: ${ai.new_lon}`,
//    );
//     return;
//   }

//   // ✅ update map
//   setPosition([ai.new_lat, ai.new_lon]);
//   setCollisionZone(null);

//   // ✅ send to form
//   onSelect(ai.new_lat, ai.new_lon, false, "ai_recommended");
// }
//   return (
//     <>
//       <MapContainer
//         center={[8.98, 38.79]}
//         zoom={13}
//         style={{ height: "400px" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <ClickHandler />

//         {position && <Marker position={position} />}

//         {collisionZone && (
//           <Circle center={collisionZone} radius={500} color="red" />
//         )}
//       </MapContainer>

//       {/* COLLISION UI */}
//       {/* {collisionZone && (
//         <>
//           <p className="text-red-600 font-bold mt-2">
//             ⚠️ Collision with: {collisionSource}
//           </p>

//           <button
//             onClick={handleAIClick}
//             className="bg-black text-white px-4 py-2 rounded mt-2"
//           >
//             🤖 Find Safe Location
//           </button>
//         </>
//       )} */}
//       {collisionZone && (
//         <div className="mt-3 p-3 rounded-lg bg-red-100 border border-red-300">
//           <p className="text-red-700 font-semibold">
//             ⚠️ Collision detected with: {collisionSource}
//           </p>

//           <button
//             onClick={handleAIClick}
//             className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition"
//           >
//             🤖 Find Better Location (AI)
//           </button>
//         </div>
//       )}
//       {collisionZone && (
//         <div className="mt-3 p-3 rounded-lg bg-red-100 border border-red-300">
//           <p className="text-red-700 font-semibold">
//             ⚠️ Collision detected with: {collisionSource}
//           </p>

//           <button
//             onClick={handleAIClick}
//             className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition"
//           >
//             🤖 Find Better Location (AI)
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet";
import { supabase } from "@/integrations/supabase/client";
import { getRecommendedLocation } from "@/services/api";

export default function MapPicker({ onSelect }) {
  const [position, setPosition] = useState<any>(null);
  const [collisionZone, setCollisionZone] = useState<any>(null);
  const [collisionSource, setCollisionSource] = useState("");
  const [coords, setCoords] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // -------------------------
  // MAP CLICK
  // -------------------------
  function ClickHandler() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;

        setPosition([lat, lng]);
        setCoords({ lat, lng });

        const { data } = await supabase.rpc("check_collision", {
          lat,
          lon: lng,
        });

        const result = data?.[0] || {
          has_collision: false,
          source: "none",
        };

        setCollisionZone(result.has_collision ? [lat, lng] : null);
        setCollisionSource(result.source);

        onSelect(lat, lng, result.has_collision, result.source);
      },
    });

    return null;
  }

  // -------------------------
  // AI FUNCTION
  // -------------------------
  async function handleAIClick(e: any) {
    e.preventDefault(); // 🔥 VERY IMPORTANT
    e.stopPropagation(); // 🔥 STOP FORM SUBMIT

    if (!coords) {
      alert("📍 Please click on map first");
      return;
    }

    setLoadingAI(true);

    try {
      const ai = await getRecommendedLocation(coords.lat, coords.lng);

      if (!ai) {
        alert("❌ AI could not find safe location");
        return;
      }

      // ✅ UPDATE MAP
      setPosition([ai.new_lat, ai.new_lon]);
      setCollisionZone(null);
      setCoords({ lat: ai.new_lat, lng: ai.new_lon });

      // ✅ SEND TO FORM
      onSelect(ai.new_lat, ai.new_lon, false, "AI_SAFE");

      // ✅ NICE UI MESSAGE
      alert(
        `🤖 AI FOUND SAFE LOCATION ✅\n\nLatitude: ${ai.new_lat.toFixed(
          5,
        )}\nLongitude: ${ai.new_lon.toFixed(5)}`,
      );
    } catch (err) {
      console.error(err);
      alert("AI error");
    } finally {
      setLoadingAI(false);
    }
  }

  return (
    <>
      <MapContainer
        center={[8.98, 38.79]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler />

        {position && <Marker position={position} />}

        {collisionZone && (
          <Circle center={collisionZone} radius={500} color="red" />
        )}
      </MapContainer>

      {/* COLLISION UI */}
      {collisionZone && (
        <div className="mt-3 p-4 rounded-xl bg-red-100 border border-red-300 shadow">
          <p className="text-red-700 font-semibold">
            ⚠️ Collision detected with:{" "}
            <span className="underline">{collisionSource}</span>
          </p>

          <button
            type="button" // 🔥🔥🔥 FIX HERE
            onClick={handleAIClick}
            disabled={loadingAI}
            className="mt-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition disabled:opacity-50"
          >
            {loadingAI
              ? "🤖 Finding best location..."
              : "🤖 Find Safe Location"}
          </button>
        </div>
      )}
    </>
  );
}