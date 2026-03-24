// import React, { useEffect, useRef, Fragment } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import type { Submission } from "@/types/submission";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// interface Props {
//   submissions: Submission[];
//   onSelect: (sub: Submission) => void;
// }

// // ✅ Fit bounds correctly
// function FitBounds({ submissions }: { submissions: Submission[] }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!submissions || submissions.length === 0) return;

//     const coords = submissions.flatMap((s) =>
//       (s.coordinates || []).map((c) => [c.lat, c.lng] as [number, number]),
//     );

//     if (coords.length > 0) {
//       map.fitBounds(coords, { padding: [50, 50] });
//     }
//   }, [submissions]);

//   return null;
// }

// // ✅ color logic
// const statusColor = (sub: Submission) => {
//   if (sub.hasCollision && sub.status !== "approved") return "red";
//   if (sub.status === "approved") return "green";
//   if (sub.status === "rejected") return "red";
//   return "orange";
// };

// export default function SubmissionMap({ submissions = [], onSelect }: Props) {
//   const mapRef = useRef<L.Map | null>(null);

//   // ✅ Fix disappearing / resize bug
//   useEffect(() => {
//     setTimeout(() => {
//       mapRef.current?.invalidateSize();
//     }, 200);
//   }, [submissions]);

//   return (
//     <div className="h-[500px] w-full border rounded-lg overflow-hidden">
//       <MapContainer
//         center={[9.03, 38.74]} // Ethiopia
//         zoom={6}
//         className="h-full w-full"
//         ref={mapRef}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         <FitBounds submissions={submissions} />

//         {submissions.map((sub) => {
//           if (!sub.coordinates || sub.coordinates.length === 0) return null;

//           const color = statusColor(sub);
// console.log("MAP DATA:", submissions);
//           return (
//             <Fragment key={sub.id}>
//               {sub.coordinates.map((c, i) => (
//                 <CircleMarker
//                   key={`${sub.id}-${i}`}
//                   center={[c.lat, c.lng]}
//                   radius={8}
//                   pathOptions={{
//                     color,
//                     fillColor: color,
//                     fillOpacity: 0.9,
//                   }}
//                   eventHandlers={{
//                     click: () => onSelect(sub),
//                   }}
//                 >
//                   <Popup>
//                     <b>{sub.sectorName}</b> <br />
//                     {sub.sectorType} <br />
//                     Status: {sub.status} <br />
//                     {sub.hasCollision ? "⚠ Collision" : "✅ Safe"}
//                   </Popup>
//                 </CircleMarker>
//               ))}
//             </Fragment>
//           );
//         })}
//       </MapContainer>
//     </div>
//   );
// }

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { Submission } from "@/types/submission";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  submissions: Submission[];
  onSelect: (sub: Submission) => void;
}

export default function SubmissionMap({ submissions = [], onSelect }: Props) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100);
  }, [submissions]);

  const validSubs = submissions.filter(
    (s) => s.coordinates && s.coordinates.length > 0,
  );

  return (
    <div className="h-[500px] w-full border rounded-lg overflow-hidden">
      <MapContainer
        center={[9.03, 38.74]}
        zoom={6}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {validSubs.map((sub) => {
          const color =
            sub.hasCollision && sub.status !== "approved"
              ? "red"
              : sub.status === "approved"
                ? "green"
                : "orange";

          return sub.coordinates.map((c, i) => (
            <CircleMarker
              key={`${sub.id}-${i}`}
              center={[c.lat, c.lng]}
              radius={8}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.9,
              }}
              eventHandlers={{
                click: () => onSelect(sub),
              }}
            >
              <Popup>
                <b>{sub.sectorName}</b>
                <br />
                {sub.sectorType}
                <br />
                Status: {sub.status}
                <br />
                {sub.hasCollision ? "⚠ Collision" : "✅ Safe"}
              </Popup>
            </CircleMarker>
          ));
        })}
      </MapContainer>
    </div>
  );
}
