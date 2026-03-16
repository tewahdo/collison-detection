import React, { useEffect, Fragment } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import type { Submission } from "@/types/submission";
import "leaflet/dist/leaflet.css";

interface Props {
  submissions: Submission[];
  onSelect: (sub: Submission) => void;
}

function FitBounds({ submissions }: { submissions: Submission[] }) {
  const map = useMap();
  useEffect(() => {
    if (submissions.length === 0) return;
    const allCoords = submissions.flatMap((s) =>
      s.coordinates.map((c) => [c.lat, c.lng] as [number, number]),
    );
    if (allCoords.length > 0) {
      map.fitBounds(allCoords, { padding: [40, 40], maxZoom: 13 });
    }
  }, [submissions, map]);
  return null;
}

const statusColor = (sub: Submission) => {
  if (sub.hasCollision && sub.status !== "approved") return "#e54545"; // collision red
  if (sub.status === "approved") return "#2fa87b"; // green
  if (sub.status === "rejected") return "#e54545";
  return "#e89f1a"; // pending yellow
};

export default function SubmissionMap({ submissions, onSelect }: Props) {
  return (
    <div className="rounded-lg overflow-hidden border border-border h-[450px] md:h-[550px]">
      <MapContainer
        center={[36.72, 3.15]}
        zoom={11}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds submissions={submissions} />
        {submissions.map((sub) => {
          const color = statusColor(sub);
          const positions = sub.coordinates.map(
            (c) => [c.lat, c.lng] as [number, number],
          );
          return (
            <Fragment key={sub.id}>
              {positions.length > 1 && (
                <Polyline
                  positions={positions}
                  pathOptions={{ color, weight: 3, opacity: 0.8 }}
                />
              )}
              {positions.map((pos, i) => (
                <CircleMarker
                  key={`${sub.id}-${i}`}
                  center={pos}
                  radius={7}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: 0.7,
                    weight: 2,
                  }}
                  eventHandlers={{ click: () => onSelect(sub) }}
                >
                  <Popup>
                    <div className="text-sm font-display">
                      <p className="font-semibold">{sub.sectorName}</p>
                      <p className="capitalize text-xs">
                        {sub.sectorType} · {sub.status}
                      </p>
                      {sub.hasCollision && (
                        <p className="text-xs mt-1" style={{ color }}>
                          ⚠ Collision detected
                        </p>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
