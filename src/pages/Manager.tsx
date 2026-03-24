import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  getSubmissions,
  updateSubmissionStatus,
  notifySector,
} from "@/services/api";
import type { Submission } from "@/types/submission";
import { toast } from "sonner";

function StatusIcon({ status }: { status: string }) {
  if (status === "approved")
    return <CheckCircle className="h-4 w-4 text-approved" />;
  if (status === "rejected")
    return <XCircle className="h-4 w-4 text-rejected" />;
  return <Clock className="h-4 w-4 text-pending" />;
}

export default function Manager() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("pending");

  useEffect(() => {
    getSubmissions().then((res) => {
      if (res.data) setSubmissions(res.data);
    });
  }, []);

  const filtered = useMemo(() => {
    if (tab === "all") return submissions;
    if (tab === "collisions") return submissions.filter((s) => s.hasCollision);
    return submissions.filter((s) => s.status === tab);
  }, [submissions, tab]);

  const stats = {
    pending: submissions.filter((s) => s.status === "pending").length,
    collisions: submissions.filter(
      (s) => s.hasCollision && s.status === "pending",
    ).length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  const handleAction = async (action: "approved" | "rejected") => {
    if (!selected) return;
    setLoading(true);
    try {
      const res = await updateSubmissionStatus(
        selected.id,
        action,
        message || undefined,
      );
      if (res.success && res.data) {
        toast.success(`Submission ${action}`);
        setSubmissions((prev) =>
          prev.map((s) => (s.id === res.data!.id ? res.data! : s)),
        );
        setSelected(null);
        setMessage("");
      }
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = async () => {
    if (!selected || !message.trim()) {
      toast.error("Enter a message first");
      return;
    }
    setLoading(true);
    try {
      await notifySector(selected.id, message);
      toast.success("Message sent to sector");
      setSelected(null);
      setMessage("");
    } catch {
      toast.error("Failed to send");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 py-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Manager Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review submissions, approve or reject, and send messages to sectors.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Pending",
            value: stats.pending,
            icon: Clock,
            color: "text-pending",
          },
          {
            label: "Collisions",
            value: stats.collisions,
            icon: AlertTriangle,
            color: "text-collision",
          },
          {
            label: "Approved",
            value: stats.approved,
            icon: CheckCircle,
            color: "text-approved",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            icon: XCircle,
            color: "text-rejected",
          },
        ].map((st) => (
          <motion.div
            key={st.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <st.icon className={`h-4 w-4 ${st.color}`} />
              <span className="text-xs text-muted-foreground font-medium">
                {st.label}
              </span>
            </div>
            <p className="text-2xl font-bold">{st.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="collisions">Collisions</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {filtered.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="py-12 text-center text-muted-foreground">
                <Filter className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p>No submissions in this category.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {filtered.map((sub, i) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="glass-card hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="font-semibold text-sm truncate">
                              {sub.sectorName}
                            </h3>
                            {sub.hasCollision && (
                              <Badge
                                variant="destructive"
                                className="text-[10px] px-1.5 py-0"
                              >
                                <AlertTriangle className="h-3 w-3 mr-0.5" />{" "}
                                Collision
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="capitalize">{sub.sectorType}</span>
                            <span className="flex items-center gap-1">
                              <StatusIcon status={sub.status} />
                              <span className="capitalize">{sub.status}</span>
                            </span>
                            <span>
                              {new Date(sub.submittedAt).toLocaleDateString()}
                            </span>
                            {sub.coordinates.length > 0 && (
                              <span className="font-mono">
                                {sub.coordinates[0].lat.toFixed(4)},{" "}
                                {sub.coordinates[0].lng.toFixed(4)}
                              </span>
                            )}
                          </div>
                          {sub.collisionDetails && (
                            <p className="text-xs text-collision mt-1.5 truncate">
                              ⚠ {sub.collisionDetails}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelected(sub);
                            setMessage("");
                          }}
                          className="shrink-0"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" /> Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Review dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selected.hasCollision ? (
                    <AlertTriangle className="h-5 w-5 text-collision" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-approved" />
                  )}
                  Review — {selected.sectorName}
                </DialogTitle>
                <DialogDescription>
                  {selected.hasCollision
                    ? "Collision detected. Approve or reject this submission."
                    : "No collision. You may approve or send a message."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {selected.hasCollision && selected.collisionDetails && (
                  <div className="rounded-md bg-collision/10 border border-collision/20 p-3 text-sm text-collision">
                    <strong>Collision:</strong> {selected.collisionDetails}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>{" "}
                    <span className="capitalize font-medium">
                      {selected.sectorType}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span className={`status-badge status-${selected.status}`}>
                      {selected.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Submitted:</span>{" "}
                    <span className="font-medium">
                      {new Date(selected.submittedAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Points:</span>{" "}
                    <span className="font-medium">
                      {selected.coordinates.length}
                    </span>
                  </div>
                </div>

                {selected.managerMessage && (
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <strong>Previous message:</strong> {selected.managerMessage}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label>Message (optional)</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add notes or instructions…"
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={handleNotify}
                  disabled={loading}
                >
                  <MessageSquare className="h-4 w-4 mr-1.5" /> Send Message
                </Button>
                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="destructive"
                    onClick={() => handleAction("rejected")}
                    disabled={loading}
                  >
                    <XCircle className="h-4 w-4 mr-1.5" /> Reject
                  </Button>
                  <Button
                    onClick={() => handleAction("approved")}
                    disabled={loading}
                  >
                    <CheckCircle className="h-4 w-4 mr-1.5" /> Approve
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
