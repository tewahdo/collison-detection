// import { motion } from "framer-motion";
// import { Eye, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import type { Submission } from "@/types/submission";

// interface Props {
//   submissions: Submission[];
//   onSelect: (sub: Submission) => void;
// }

// const StatusIcon = ({ status }: { status: string }) => {
//   switch (status) {
//     case "approved":
//       return <CheckCircle className="h-3.5 w-3.5 text-approved" />;
//     case "rejected":
//       return <XCircle className="h-3.5 w-3.5 text-rejected" />;
//     default:
//       return <Clock className="h-3.5 w-3.5 text-pending" />;
//   }
// };

// export default function SubmissionTable({ submissions, onSelect }: Props) {
//   return (
//     <div className="glass-card rounded-lg overflow-hidden">
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Sector</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Collision</TableHead>
//               <TableHead>Submitted</TableHead>
//               <TableHead className="w-[60px]"></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {submissions.length === 0 && (
//               <TableRow>
//                 <TableCell
//                   colSpan={6}
//                   className="text-center py-8 text-muted-foreground"
//                 >
//                   No submissions found
//                 </TableCell>
//               </TableRow>
//             )}
//             {submissions.map((sub, i) => (
//               <motion.tr
//                 key={sub.id}
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.03 }}
//                 className="border-b border-border hover:bg-muted/40 transition-colors"
//               >
//                 <TableCell className="font-medium">{sub.sectorName}</TableCell>
//                 <TableCell className="capitalize text-muted-foreground">
//                   {sub.sectorType}
//                 </TableCell>
//                 <TableCell>
//                   <span className={`status-badge status-${sub.status}`}>
//                     <StatusIcon status={sub.status} />
//                     <span className="ml-1">{sub.status}</span>
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   {sub.hasCollision ? (
//                     <span className="status-badge status-collision">
//                       <AlertTriangle className="h-3 w-3 mr-1" /> Yes
//                     </span>
//                   ) : (
//                     <span className="text-sm text-muted-foreground">None</span>
//                   )}
//                 </TableCell>
//                 <TableCell className="text-sm text-muted-foreground font-mono">
//                   {new Date(sub.submittedAt).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => onSelect(sub)}
//                   >
//                     <Eye className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </motion.tr>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import { Eye, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Submission } from "@/types/submission";

interface Props {
  submissions: Submission[];
  onSelect: (sub: Submission) => void;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-3.5 w-3.5 text-approved" />;
    case "rejected":
      return <XCircle className="h-3.5 w-3.5 text-rejected" />;
    default:
      return <Clock className="h-3.5 w-3.5 text-pending" />;
  }
};

export default function SubmissionTable({ submissions, onSelect }: Props) {
  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sector</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Collision</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* ✅ SAFE CHECK */}
            {(!submissions || submissions.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No submissions found
                </TableCell>
              </TableRow>
            )}

            {submissions?.map((sub, i) => (
              <motion.tr
                key={sub.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border hover:bg-muted/40 transition-colors"
              >
                <TableCell className="font-medium">{sub.sectorName}</TableCell>

                <TableCell className="capitalize text-muted-foreground">
                  {sub.sectorType}
                </TableCell>

                <TableCell>
                  <span className={`status-badge status-${sub.status}`}>
                    <StatusIcon status={sub.status} />
                    <span className="ml-1">{sub.status}</span>
                  </span>
                </TableCell>

                <TableCell>
                  {sub.hasCollision ? (
                    <span className="status-badge status-collision">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Yes
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">None</span>
                  )}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground font-mono">
                  {new Date(sub.submittedAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSelect(sub)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}