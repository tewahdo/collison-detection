import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Plus,
  Trash2,
  Send,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { submitSector } from "@/services/api";
import type { SectorType, Coordinate, Submission } from "@/types/submission";
import { toast } from "sonner";

const SECTOR_TYPES: { value: SectorType; label: string }[] = [
  { value: "airport", label: "Airport" },
  { value: "asphalt", label: "Asphalt / Road" },
  { value: "railway", label: "Railway" },
  { value: "pipeline", label: "Pipeline" },
  { value: "powerline", label: "Power Line" },
  { value: "building", label: "Building" },
  { value: "other", label: "Other" },
];

const METADATA_FIELDS: Record<SectorType, string[]> = {
  airport: ["capacity", "classification", "icaoCode"],
  asphalt: ["lanes", "surfaceType", "width"],
  railway: ["gauge", "electrified", "maxSpeed"],
  pipeline: ["diameter", "material", "pressure"],
  powerline: ["voltage", "type", "towers"],
  building: ["floors", "usage", "area"],
  other: ["description"],
};

interface Props {
  onSubmitted: (submission: Submission) => void;
}

export default function SectorForm({ onSubmitted }: Props) {
  const [sectorName, setSectorName] = useState("");
  const [sectorType, setSectorType] = useState<SectorType | "">("");
  const [coordinates, setCoordinates] = useState<Coordinate[]>([
    { lat: 0, lng: 0 },
  ]);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!sectorName.trim()) e.sectorName = "Sector name is required";
    if (sectorName.length > 100) e.sectorName = "Max 100 characters";
    if (!sectorType) e.sectorType = "Select a sector type";
    if (coordinates.length === 0)
      e.coordinates = "At least one coordinate required";
    coordinates.forEach((c, i) => {
      if (c.lat < -90 || c.lat > 90) e[`lat_${i}`] = "Invalid latitude";
      if (c.lng < -180 || c.lng > 180) e[`lng_${i}`] = "Invalid longitude";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !sectorType) return;

    setSubmitting(true);
    try {
      const res = await submitSector({
        sectorName: sectorName.trim(),
        sectorType,
        coordinates,
        metadata,
      });
      if (res.success && res.data) {
        toast.success("Submission saved", {
          description: res.data.hasCollision
            ? "Collision detected — manager notified for review."
            : "No collision detected.",
          icon: res.data.hasCollision ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          ),
        });
        onSubmitted(res.data);
        setSectorName("");
        setSectorType("");
        setCoordinates([{ lat: 0, lng: 0 }]);
        setMetadata({});
      }
    } catch {
      toast.error("Failed to submit sector");
    } finally {
      setSubmitting(false);
    }
  };

  const addCoordinate = () =>
    setCoordinates([...coordinates, { lat: 0, lng: 0 }]);
  const removeCoordinate = (i: number) =>
    setCoordinates(coordinates.filter((_, idx) => idx !== i));
  const updateCoordinate = (i: number, field: "lat" | "lng", val: string) => {
    const updated = [...coordinates];
    updated[i] = { ...updated[i], [field]: parseFloat(val) || 0 };
    setCoordinates(updated);
  };

  const metaFields = sectorType ? METADATA_FIELDS[sectorType] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5 text-primary" />
            New Sector Submission
          </CardTitle>
          <CardDescription>
            Submit sector geometry for collision analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="sectorName">Sector Name *</Label>
              <Input
                id="sectorName"
                value={sectorName}
                onChange={(e) => setSectorName(e.target.value)}
                placeholder="e.g. North Runway Extension"
              />
              {errors.sectorName && (
                <p className="text-xs text-destructive">{errors.sectorName}</p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-1.5">
              <Label>Sector Type *</Label>
              <Select
                value={sectorType}
                onValueChange={(v) => {
                  setSectorType(v as SectorType);
                  setMetadata({});
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {SECTOR_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.sectorType && (
                <p className="text-xs text-destructive">{errors.sectorType}</p>
              )}
            </div>

            {/* Coordinates */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Coordinates *</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addCoordinate}
                  className="text-primary"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Point
                </Button>
              </div>
              {errors.coordinates && (
                <p className="text-xs text-destructive">{errors.coordinates}</p>
              )}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {coordinates.map((c, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground font-mono w-6 shrink-0">
                      #{i + 1}
                    </span>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Lat"
                      value={c.lat || ""}
                      onChange={(e) =>
                        updateCoordinate(i, "lat", e.target.value)
                      }
                      className="font-mono text-sm"
                    />
                    <Input
                      type="number"
                      step="any"
                      placeholder="Lng"
                      value={c.lng || ""}
                      onChange={(e) =>
                        updateCoordinate(i, "lng", e.target.value)
                      }
                      className="font-mono text-sm"
                    />
                    {coordinates.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCoordinate(i)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata */}
            {metaFields.length > 0 && (
              <div className="space-y-2">
                <Label>Metadata</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {metaFields.map((field) => (
                    <div key={field} className="space-y-1">
                      <Label className="text-xs text-muted-foreground capitalize">
                        {field}
                      </Label>
                      <Input
                        value={metadata[field] || ""}
                        onChange={(e) =>
                          setMetadata({ ...metadata, [field]: e.target.value })
                        }
                        placeholder={field}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                "Analyzing…"
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Submit & Check Collisions
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
