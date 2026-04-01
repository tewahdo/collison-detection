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









import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { supabase } from "@/integrations/supabase/client";
import { getRecommendedLocation } from "@/services/api";

// fix icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface Props {
  onSelect: (lat: number, lng: number, collision: boolean) => void;
}

function ClickHandler({ onSelect }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      const { data, error } = await supabase.rpc("check_collision", {
        lat,
        lon: lng,
      });

      if (error) {
        console.error(error);
        return;
      }

      onSelect(lat, lng, Boolean(data));
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ onSelect }: Props) {
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer
        center={[8.98, 38.79]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler onSelect={onSelect} />
      </MapContainer>
    </div>
  );
}

const handleMapClick = async (lat, lng) => {
  const res = await getSubmissions();

  const found = res.data?.find((item) => {
    return (
      Math.abs(item.latitude - lat) < 0.001 &&
      Math.abs(item.longitude - lng) < 0.001
    );
  });

  if (found) {
    if (found.hasCollision) {
      alert(
        `⚠ Collision found!\nAlready used by: ${found.collision_info?.sector_name}`
      );
    } else {
      alert(`✅ Safe location\nSector: ${found.sectorName}`);
    }
  }
};











