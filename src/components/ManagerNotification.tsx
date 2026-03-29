// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   AlertTriangle,
//   CheckCircle,
//   XCircle,
//   MessageSquare,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { updateSubmissionStatus, notifySector } from "@/services/api";
// import type { Submission } from "@/types/submission";
// import { toast } from "sonner";

// interface Props {
//   submission: Submission | null;
//   open: boolean;
//   onClose: () => void;
//   onUpdated: (sub: Submission) => void;
// }

// export default function ManagerNotification({
//   submission,
//   open,
//   onClose,
//   onUpdated,
// }: Props) {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!submission) return null;

//   const handleAction = async (action: "approved" | "rejected") => {
//     setLoading(true);
//     try {
//       const res = await updateSubmissionStatus(
//         submission.id,
//         action,
//         message || undefined,
//       );
//       if (res.success && res.data) {
//         toast.success(`Submission ${action}`);
//         onUpdated(res.data);
//         onClose();
//         setMessage("");
//       }
//     } catch {
//       toast.error("Failed to update status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNotify = async () => {
//     if (!message.trim()) {
//       toast.error("Enter a message");
//       return;
//     }
//     setLoading(true);
//     try {
//       await notifySector(submission.id, message);
//       toast.success("Notification sent to sector");
//       onClose();
//       setMessage("");
//     } catch {
//       toast.error("Failed to send notification");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             {submission.hasCollision ? (
//               <AlertTriangle className="h-5 w-5 text-collision" />
//             ) : (
//               <CheckCircle className="h-5 w-5 text-approved" />
//             )}
//             Manager Review — {submission.sectorName}
//           </DialogTitle>
//           <DialogDescription>
//             {submission.hasCollision
//               ? "Collision detected. Approve or reject this submission."
//               : "No collision. You may approve or send a message to the sector."}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-2">
//           {/* Collision info */}
//           {submission.hasCollision && submission.collisionDetails && (
//             <div className="rounded-md bg-collision/10 border border-collision/20 p-3 text-sm text-collision">
//               <strong>Collision:</strong> {submission.collisionDetails}
//             </div>
//           )}

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <span className="text-muted-foreground">Type:</span>{" "}
//               <span className="capitalize font-medium">
//                 {submission.sectorType}
//               </span>
//             </div>
//             <div>
//               <span className="text-muted-foreground">Status:</span>{" "}
//               <span className="status-badge status-pending">
//                 {submission.status}
//               </span>
//             </div>
//           </div>

//           <div className="space-y-1.5">
//             <Label>Message (optional)</Label>
//             <Textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Add notes or instructions…"
//               rows={3}
//             />
//           </div>
//         </div>

//         <DialogFooter className="flex-col sm:flex-row gap-2">
//           <Button variant="outline" onClick={handleNotify} disabled={loading}>
//             <MessageSquare className="h-4 w-4 mr-1.5" /> Send Message
//           </Button>
//           <div className="flex gap-2 ml-auto">
//             <Button
//               variant="destructive"
//               onClick={() => handleAction("rejected")}
//               disabled={loading}
//             >
//               <XCircle className="h-4 w-4 mr-1.5" /> Reject
//             </Button>
//             <Button onClick={() => handleAction("approved")} disabled={loading}>
//               <CheckCircle className="h-4 w-4 mr-1.5" /> Approve
//             </Button>
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   AlertTriangle,
//   CheckCircle,
//   XCircle,
//   MessageSquare,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { updateSubmissionStatus, notifySector } from "@/services/api";
// import type { Submission } from "@/types/submission";
// import { toast } from "sonner";

// interface Props {
//   submission: Submission | null;
//   open: boolean;
//   onClose: () => void;
//   onUpdated: (sub: Submission) => void;
// }

// export default function ManagerNotification({
//   submission,
//   open,
//   onClose,
//   onUpdated,
// }: Props) {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!submission) return null;

//   const handleAction = async (action: "approved" | "rejected") => {
//     setLoading(true);
//     try {
//       const res = await updateSubmissionStatus(
//         submission.id,
//         action,
//         message || undefined,
//       );
//       if (res.success && res.data) {
//         toast.success(`Submission ${action}`);
//         onUpdated(res.data);
//         onClose();
//         setMessage("");
//       }
//     } catch {
//       toast.error("Failed to update status");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNotify = async () => {
//     if (!message.trim()) {
//       toast.error("Enter a message");
//       return;
//     }
//     setLoading(true);
//     try {
//       await notifySector(submission.id, message);
//       toast.success("Notification sent to sector");
//       onClose();
//       setMessage("");
//     } catch {
//       toast.error("Failed to send notification");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             {submission.hasCollision ? (
//               <AlertTriangle className="h-5 w-5 text-collision" />
//             ) : (
//               <CheckCircle className="h-5 w-5 text-approved" />
//             )}
//             Manager Review — {submission.sectorName}
//           </DialogTitle>
//           <DialogDescription>
//             {submission.hasCollision
//               ? "Collision detected. Approve or reject this submission."
//               : "No collision. You may approve or send a message to the sector."}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-2">
//           {/* Collision info */}
//           {submission.hasCollision && submission.collisionDetails && (
//             <div className="rounded-md bg-collision/10 border border-collision/20 p-3 text-sm text-collision">
//               <strong>Collision:</strong> {submission.collisionDetails}
//             </div>
//           )}

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <span className="text-muted-foreground">Type:</span>{" "}
//               <span className="capitalize font-medium">
//                 {submission.sectorType}
//               </span>
//             </div>
//             <div>
//               <span className="text-muted-foreground">Status:</span>{" "}
//               <span className="status-badge status-pending">
//                 {submission.status}
//               </span>
//             </div>
//           </div>

//           <div className="space-y-1.5">
//             <Label>Message (optional)</Label>
//             <Textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Add notes or instructions…"
//               rows={3}
//             />
//           </div>
//         </div>

//         <DialogFooter className="flex-col sm:flex-row gap-2">
//           <Button variant="outline" onClick={handleNotify} disabled={loading}>
//             <MessageSquare className="h-4 w-4 mr-1.5" /> Send Message
//           </Button>
//           <div className="flex gap-2 ml-auto">
//             <Button
//               variant="destructive"
//               onClick={() => handleAction("rejected")}
//               disabled={loading}
//             >
//               <XCircle className="h-4 w-4 mr-1.5" /> Reject
//             </Button>
//             <Button onClick={() => handleAction("approved")} disabled={loading}>
//               <CheckCircle className="h-4 w-4 mr-1.5" /> Approve
//             </Button>
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { updateSubmissionStatus, notifySector } from "@/services/api";
import type { Submission } from "@/types/submission";
import { toast } from "sonner";

interface Props {
  submission: Submission | null;
  open: boolean;
  onClose: () => void;
  onUpdated: (sub: Submission) => void;
}

export default function ManagerNotification({
  submission,
  open,
  onClose,
  onUpdated,
}: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!submission) return null;

  // -----------------------------
  // APPROVE / REJECT
  // -----------------------------
  const handleAction = async (action: "approved" | "rejected") => {
    setLoading(true);

    try {
      const res = await updateSubmissionStatus(
        submission.id,
        action,
        message || undefined,
      );

      if (!res.success) {
        toast.error(res.error || "Failed to update status");
        return;
      }

      toast.success(`Submission ${action}`);
      onUpdated(res.data!);
      onClose();
      setMessage("");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // SEND MESSAGE ONLY
  // -----------------------------
  const handleNotify = async () => {
    if (!message.trim()) {
      toast.error("Enter a message");
      return;
    }

    setLoading(true);

    try {
      const res = await notifySector(submission.id, message);

      if (!res.success) {
        toast.error("Failed to send notification");
        return;
      }

      toast.success("Notification sent to sector");
      onClose();
      setMessage("");
    } catch {
      toast.error("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {submission.hasCollision ? (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            Manager Review — {submission.sectorName}
          </DialogTitle>

          <DialogDescription>
            {submission.hasCollision
              ? "⚠ Collision detected. Approve or reject this submission."
              : "✅ No collision detected. You may approve or send message."}
          </DialogDescription>
        </DialogHeader>

        {/* BODY */}
        <div className="space-y-4 py-2">
          {/* COLLISION WARNING */}
          {submission.hasCollision && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              ⚠ Collision detected at this location
            </div>
          )}

          {/* INFO */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Type:</span>{" "}
              <span className="font-medium capitalize">
                {submission.sectorType}
              </span>
            </div>

            <div>
              <span className="text-gray-500">Status:</span>{" "}
              <span className="font-medium">{submission.status}</span>
            </div>
          </div>

          {/* MESSAGE INPUT */}
          <div className="space-y-1.5">
            <Label>Message (optional)</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add notes or instructions..."
              rows={3}
            />
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleNotify} disabled={loading}>
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Send Message
          </Button>

          <div className="flex gap-2 ml-auto">
            <Button
              variant="destructive"
              onClick={() => handleAction("rejected")}
              disabled={loading}
            >
              <XCircle className="h-4 w-4 mr-1.5" />
              Reject
            </Button>

            <Button onClick={() => handleAction("approved")} disabled={loading}>
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}