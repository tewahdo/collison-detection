// import MapPicker from "./MapPicker";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Plus,
//   Trash2,
//   Send,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { submitSector } from "@/services/api";
// import type { SectorType, Coordinate, Submission } from "@/types/submission";
// import { toast } from "sonner";

// const SECTOR_TYPES = [
//   { value: "airport", label: "Airport" },
//   { value: "asphalt", label: "Asphalt / Road" },
//   { value: "railway", label: "Railway" },
//   { value: "pipeline", label: "Pipeline" },
//   { value: "powerline", label: "Power Line" },
//   { value: "building", label: "Building" },
//   { value: "other", label: "Other" },
// ];

// interface Props {
//   onSubmitted: (submission: Submission) => void;
// }

// export default function SectorForm({ onSubmitted }: Props) {
//   const [sectorName, setSectorName] = useState("");
//   const [sectorType, setSectorType] = useState<SectorType | "">("");

//   // ✅ FIXED DEFAULT LOCATION (Addis Ababa)
//   const [coordinates, setCoordinates] = useState<Coordinate[]>([
//     { lat: 8.98, lng: 38.79 },
//   ]);

//   const [metadata, setMetadata] = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!sectorName || !sectorType) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     console.log("Submitting:", {
//       sectorName,
//       sectorType,
//       coordinates,
//     });

//     setSubmitting(true);

//     try {
//       const res = await submitSector({
//         sectorName,
//         sectorType,
//         coordinates,
//         metadata,
//       });

//       if (res.success && res.data) {
//         toast.success("Submitted successfully ✅", {
//           description: res.data.hasCollision
//             ? "⚠️ Collision detected"
//             : "No collision",
//         });

//         onSubmitted(res.data);

//         // ✅ RESET FORM
//         setSectorName("");
//         setSectorType("");
//         setCoordinates([{ lat: 8.98, lng: 38.79 }]);
//         setMetadata({});
//       } else {
//         // ❗ VERY IMPORTANT FIX
//         toast.error(res.error || "Submission failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const updateCoordinate = (i: number, field: "lat" | "lng", val: string) => {
//     const updated = [...coordinates];
//     const num = parseFloat(val);

//     // ✅ FIXED (no auto 0)
//     if (!isNaN(num)) {
//       updated[i] = { ...updated[i], [field]: num };
//       setCoordinates(updated);
//     }
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//       <Card className="glass-card">
//         <CardHeader>
//           <CardTitle className="flex gap-2">
//             <MapPin /> New Submission
//           </CardTitle>
//           <CardDescription>Submit sector</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* NAME */}
//             <div>
//               <Label>Sector Name</Label>
//               <Input
//                 value={sectorName}
//                 onChange={(e) => setSectorName(e.target.value)}
//               />
//             </div>

//             {/* TYPE */}
//             <div>
//               <Label>Type</Label>
//               <Select
//                 value={sectorType}
//                 onValueChange={(v) => setSectorType(v as SectorType)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {SECTOR_TYPES.map((t) => (
//                     <SelectItem key={t.value} value={t.value}>
//                       {t.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* COORDINATES */}
//             {coordinates.map((c, i) => (
//               <div key={i} className="flex gap-2">
//                 <Input
//                   placeholder="Lat"
//                   value={c.lat}
//                   onChange={(e) => updateCoordinate(i, "lat", e.target.value)}
//                 />
//                 <Input
//                   placeholder="Lng"
//                   value={c.lng}
//                   onChange={(e) => updateCoordinate(i, "lng", e.target.value)}
//                 />
//               </div>
//             ))}

//             <Button type="submit" disabled={submitting}>
//               {submitting ? "Submitting..." : "Submit"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { submitSector } from "@/services/api";
// import MapPicker from "./MapPicker";
// import { toast } from "sonner";

// const SECTOR_TYPES = [
//   { value: "airport", label: "Airport" },
//   { value: "asphalt", label: "Road" },
//   { value: "railway", label: "Railway" },
//   { value: "pipeline", label: "Pipeline" },
//   { value: "powerline", label: "Power Line" },
//   { value: "building", label: "Building" },
//   { value: "other", label: "Other" },
// ];

// export default function SectorForm({ onSubmitted }: any) {
//   const [sectorName, setSectorName] = useState("");
//   const [sectorType, setSectorType] = useState("");

//   // ✅ Empty initially
//   const [coordinates, setCoordinates] = useState<any[]>([{ lat: "", lng: "" }]);

//   const [collision, setCollision] = useState<boolean | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   // ✅ Map selection
//   const handleMapSelect = (lat: number, lng: number, isCollision: boolean) => {
//     setCoordinates([{ lat, lng }]);
//     setCollision(isCollision);
//   };

//   // ✅ Manual fallback input
//   const handleManualChange = (field: "lat" | "lng", value: string) => {
//     const num = parseFloat(value);
//     if (!isNaN(num)) {
//       setCoordinates([{ ...coordinates[0], [field]: num }]);
//     }
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   if (!sectorName || !sectorType) {
//   //     toast.error("Fill all fields");
//   //     return;
//   //   }

//   //   if (!coordinates[0].lat || !coordinates[0].lng) {
//   //     toast.error("Select location");
//   //     return;
//   //   }

//   //   // if (collision === true) {
//   //   //   toast.error("❌ Collision detected");
//   //   //   return;
//   //   // }

//   //   setSubmitting(true);

//   //   try {
//   //     const res = await submitSector({
//   //       sectorName,
//   //       sectorType,
//   //       coordinates,
//   //     });

//   //     if (res.success) {
//   //       toast.success("✅ Submitted");

//   //       onSubmitted(res.data);

//   //       setSectorName("");
//   //       setSectorType("");
//   //       setCoordinates([{ lat: "", lng: "" }]);
//   //       setCollision(null);
//   //     } else {
//   //       toast.error(res.error);
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error("Error");
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!sectorName || !sectorType) {
//     toast.error("Fill all fields");
//     return;
//   }

//   if (!coordinates[0].lat || !coordinates[0].lng) {
//     toast.error("Select location");
//     return;
//   }

//   setSubmitting(true);

//   try {
//     const res = await submitSector({
//       sectorName,
//       sectorType,
//       coordinates,
//     });

//     if (res.success) {
//       toast.success("✅ Submitted (No collision)");

//       onSubmitted(res.data);

//       setSectorName("");
//       setSectorType("");
//       setCoordinates([{ lat: "", lng: "" }]);
//       setCollision(null);
//     } else {
//       toast.error(res.error || "Submission failed");
//     }
//   } catch (err) {
//     console.error(err);
//     toast.error("Error");
//   } finally {
//     setSubmitting(false);
//   }
// };
//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex gap-2">
//             <MapPin /> New Submission
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* NAME */}
//             <div>
//               <Label>Name</Label>
//               <Input
//                 value={sectorName}
//                 onChange={(e) => setSectorName(e.target.value)}
//               />
//             </div>

//             {/* TYPE */}
//             <div>
//               <Label>Type</Label>
//               <Select
//                 value={sectorType}
//                 onValueChange={(v) => setSectorType(v)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {SECTOR_TYPES.map((t) => (
//                     <SelectItem key={t.value} value={t.value}>
//                       {t.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* MAP */}
//             <div>
//               <Label>Select from map</Label>
//               <MapPicker onSelect={handleMapSelect} />

//               {collision !== null && (
//                 <p className={collision ? "text-red-500" : "text-green-500"}>
//                   {collision ? "⚠️ Collision detected" : "✅ Safe location"}
//                 </p>
//               )}
//             </div>

//             {/* MANUAL INPUT (backup) */}
//             {/* <div className="flex gap-2"> */}
//             <div className="flex flex-col gap-6">
//               <Input
//                 placeholder="Lat"
//                 value={coordinates[0].lat ?? ""}
//                 onChange={(e) => handleManualChange("lat", e.target.value)}
//               />
//               <Input
//                 placeholder="Lng"
//                 value={coordinates[0].lng ?? ""}
//                 onChange={(e) => handleManualChange("lng", e.target.value)}
//               />
//             </div>

//             {/* DISPLAY */}
//             {coordinates[0].lat && (
//               <p className="text-xs">
//                 📍 {coordinates[0].lat}, {coordinates[0].lng}
//               </p>
//             )}

//             <Button type="submit" disabled={submitting}>
//               {submitting ? (
//                 "Submitting..."
//               ) : (
//                 <>
//                   <Send className="h-4 w-4 mr-2" />
//                   Submit
//                 </>
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { submitSector } from "@/services/api";
// import MapPicker from "./MapPicker";
// import { toast } from "sonner";

// import { SECTOR_TYPES, SectorType } from "@/types/submission";

// export default function SectorForm({ onSubmitted }: any) {
//   const [sectorName, setSectorName] = useState("");
//   const [sectorType, setSectorType] = useState<SectorType | "">("");

//   const [coordinates, setCoordinates] = useState<
//     { lat: number | ""; lng: number | "" }[]
//   >([{ lat: "", lng: "" }]);

//   const [collision, setCollision] = useState<boolean | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   // ✅ Map click
//   // const handleMapSelect = (lat: number, lng: number, isCollision: boolean) => {
//   //   setCoordinates([{ lat, lng }]);
//   //   setCollision(isCollision);
//   // };
//  const handleMapSelect = (
//   lat: number,
//   lng: number,
//   isCollision: boolean,
//   source?: string,
//   ai?: any
// ) => {
//   setCoordinates([{ lat, lng }]);
//   setCollision(isCollision);

//   if (isCollision) {
//     toast.error(`⚠️ Collision with ${source}`);
//   } else {
//     toast.success("✅ Safe location");
//   }

//   if (ai) {
//     toast.info(`🤖 Suggested: ${ai.new_lat.toFixed(4)}, ${ai.new_lon.toFixed(4)}`);
//   }
// };

//   // ✅ Manual input
//   const handleManualChange = (field: "lat" | "lng", value: string) => {
//     const num = parseFloat(value);
//     if (!isNaN(num)) {
//       setCoordinates([{ ...coordinates[0], [field]: num }]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!sectorName || !sectorType) {
//       toast.error("Fill all fields");
//       return;
//     }

//     if (coordinates[0].lat === "" || coordinates[0].lng === "") {
//       toast.error("Select location");
//       return;
//     }

//     if (collision === true) {
//       toast.error("❌ Collision detected");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const res = await submitSector({
//         sectorName,
//         sectorType: sectorType as SectorType, // 🔥 FIX
//         coordinates: [
//           {
//             lat: Number(coordinates[0].lat),
//             lng: Number(coordinates[0].lng),
//           },
//         ],
//       });

//       if (res.success && res.data) {
//         toast.success("✅ Submitted");

//         onSubmitted(res.data);

//         // RESET
//         setSectorName("");
//         setSectorType("");
//         setCoordinates([{ lat: "", lng: "" }]);
//         setCollision(null);
//       } else {
//         toast.error(res.error || "Error");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Unexpected error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex gap-2">
//             <MapPin /> New Submission
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* NAME */}
//             <div>
//               <Label>Name</Label>
//               <Input
//                 value={sectorName}
//                 onChange={(e) => setSectorName(e.target.value)}
//               />
//             </div>

//             {/* TYPE */}
//             <div>
//               <Label>Type</Label>
//               <Select
//                 value={sectorType}
//                 onValueChange={(v) => setSectorType(v as SectorType)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   {SECTOR_TYPES.map((t) => (
//                     <SelectItem key={t} value={t}>
//                       {t.replaceAll("_", " ").toUpperCase()}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* MAP */}
//             <div>
//               <Label>Select from map</Label>
//               <MapPicker onSelect={handleMapSelect} />

//               {collision !== null && (
//                 <p className={collision ? "text-red-500" : "text-green-500"}>
//                   {collision ? "⚠️ Collision detected" : "✅ Safe location"}
//                 </p>
//               )}
//             </div>

//             {/* MANUAL INPUT */}
//             <div className="flex flex-col gap-4">
//               <Input
//                 placeholder="Latitude"
//                 value={coordinates[0].lat}
//                 onChange={(e) => handleManualChange("lat", e.target.value)}
//               />
//               <Input
//                 placeholder="Longitude"
//                 value={coordinates[0].lng}
//                 onChange={(e) => handleManualChange("lng", e.target.value)}
//               />
//             </div>

//             {/* DISPLAY */}
//             {coordinates[0].lat !== "" && (
//               <p className="text-xs">
//                 📍 {coordinates[0].lat}, {coordinates[0].lng}
//               </p>
//             )}

//             {/* SUBMIT */}
//             <Button type="submit" disabled={submitting}>
//               {submitting ? (
//                 "Submitting..."
//               ) : (
//                 <>
//                   <Send className="h-4 w-4 mr-2" />
//                   Submit
//                 </>
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Send, Building2, FileText } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitSector } from "@/services/api";
import MapPicker from "./MapPicker";
import { toast } from "sonner";

import { SECTOR_TYPES, SectorType } from "@/types/submission";

export default function SectorForm({ onSubmitted }: any) {
  const [sectorName, setSectorName] = useState("");
  const [sectorType, setSectorType] = useState<SectorType | "">("");

  // 🔥 NEW FIELDS (GOVERNMENT STYLE)
  const [organization, setOrganization] = useState("");
  const [license, setLicense] = useState("");
  const [description, setDescription] = useState("");

  const [coordinates, setCoordinates] = useState<
    { lat: number | ""; lng: number | "" }[]
  >([{ lat: "", lng: "" }]);

  const [collision, setCollision] = useState<boolean | null>(null);
  const [collisionSource, setCollisionSource] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // ✅ MAP SELECT
  const handleMapSelect = (
    lat: number,
    lng: number,
    isCollision: boolean,
    source?: string,
    ai?: any,
  ) => {
    setCoordinates([{ lat, lng }]);
    setCollision(isCollision);
    setCollisionSource(source || "");

    if (isCollision) {
      toast.error(`⚠️ Conflict with ${source}`);
    } else {
      toast.success("✅ Safe location selected");
    }

    // 🔥 AI AUTO FILL (IMPORTANT FIX)
    if (ai) {
      setCoordinates([
        {
          lat: ai.new_lat,
          lng: ai.new_lon,
        },
      ]);

      toast.success(
        `🤖 AI Selected Better Location:\n${ai.new_lat.toFixed(
          4,
        )}, ${ai.new_lon.toFixed(4)}`,
      );
    }
  };

  // ✅ MANUAL INPUT
  const handleManualChange = (field: "lat" | "lng", value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setCoordinates([{ ...coordinates[0], [field]: num }]);
    }
  };

  // ✅ SUBMIT (FIXED: ALLOW COLLISION)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sectorName || !sectorType || !organization || !license) {
      toast.error("Fill all required fields");
      return;
    }

    if (coordinates[0].lat === "" || coordinates[0].lng === "") {
      toast.error("Select location");
      return;
    }

    setSubmitting(true);

    try {
      const res = await submitSector({
        sectorName,
        sectorType: sectorType as SectorType,
        coordinates: [
          {
            lat: Number(coordinates[0].lat),
            lng: Number(coordinates[0].lng),
          },
        ],
        metadata: {
          organization,
          license,
          description,
          collision_source: collisionSource,
        },
      });

      if (res.success && res.data) {
        toast.success("✅ Submitted successfully");

        onSubmitted(res.data);

        // RESET
        setSectorName("");
        setSectorType("");
        setOrganization("");
        setLicense("");
        setDescription("");
        setCoordinates([{ lat: "", lng: "" }]);
        setCollision(null);
      } else {
        toast.error(res.error || "Error");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };




  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="shadow-xl border">
        <CardHeader>
          <CardTitle className="flex gap-2 text-lg">
            <Building2 /> Infrastructure Submission Form
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ORGANIZATION */}
            <div>
              <Label>Organization Name *</Label>
              <Input
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Ethiopian Electric Power"
              />
            </div>

            {/* LICENSE */}
            <div>
              <Label>License / Registration ID *</Label>
              <Input
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="Gov License ID"
              />
            </div>

            {/* SECTOR NAME */}
            <div>
              <Label>Project Name *</Label>
              <Input
                value={sectorName}
                onChange={(e) => setSectorName(e.target.value)}
              />
            </div>

            {/* TYPE */}
            <div>
              <Label>Sector Type *</Label>
              <Select
                value={sectorType}
                onValueChange={(v) => setSectorType(v as SectorType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  {SECTOR_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.replace(/_/g, " ").toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project details..."
              />
            </div>

            {/* MAP */}
            <div>
              <Label>Select Location</Label>
              <MapPicker onSelect={handleMapSelect} />

              {collision !== null && (
                <p className={collision ? "text-red-600" : "text-green-600"}>
                  {collision
                    ? `⚠️ Conflict with ${collisionSource}`
                    : "✅ Safe location"}
                </p>
              )}
            </div>

            {/* COORDINATES */}
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Latitude"
                value={coordinates[0].lat}
                onChange={(e) => handleManualChange("lat", e.target.value)}
              />
              <Input
                placeholder="Longitude"
                value={coordinates[0].lng}
                onChange={(e) => handleManualChange("lng", e.target.value)}
              />
            </div>

            {/* DISPLAY */}
            {coordinates[0].lat !== "" && (
              <p className="text-xs text-muted-foreground">
                📍 {coordinates[0].lat}, {coordinates[0].lng}
              </p>
            )}

            {/* SUBMIT */}
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}