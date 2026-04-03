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
  BarChart3,
  RefreshCw,
  FileDown,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  getUserSubmissions,
} from "@/services/api";
import type { Submission } from "@/types/submission";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import SubmissionMap from "@/components/SubmissionMap";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function StatusIcon({ status }: { status: string }) {
  if (status === "approved")
    return <CheckCircle className="h-4 w-4 text-approved" />;
  if (status === "rejected")
    return <XCircle className="h-4 w-4 text-rejected" />;
  return <Clock className="h-4 w-4 text-pending" />;
}

export default function Manager() {
  const { t } = useLanguage();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("pending");
  const [loadingData, setLoadingData] = useState(true);

  // const fetchData = () => {
  //   setLoadingData(true);
  //   getSubmissions().then((res) => {
  //     if (res.data) setSubmissions(res.data);
  //     setLoadingData(false);
  //   });
  // };
  const fetchData = () => {
    setLoadingData(true);
    getSubmissions().then((res) => {
      console.log("MANAGER DATA:", res); // FIXED DEBUG
      if (res.data) setSubmissions(res.data);
      setLoadingData(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (tab === "all") return submissions;
    if (tab === "collisions") return submissions.filter((s) => s.hasCollision);
    return submissions.filter((s) => s.status === tab);
  }, [submissions, tab]);

  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    collisions: submissions.filter(
      (s) => s.hasCollision && s.status === "pending",
    ).length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  const pieData = [
    {
      name: t("status.pending"),
      value: stats.pending,
      color: "hsl(38 85% 48%)",
    },
    {
      name: t("status.approved"),
      value: stats.approved,
      color: "hsl(152 55% 35%)",
    },
    {
      name: t("status.rejected"),
      value: stats.rejected,
      color: "hsl(0 65% 50%)",
    },
  ].filter((d) => d.value > 0);

  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    submissions.forEach((s) => {
      counts[s.sectorType] = (counts[s.sectorType] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: t(`sector.${name}`),
      value,
    }));
  }, [submissions, t]);

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
        toast.success(
          t(
            action === "approved"
              ? "manager.success.approved"
              : "manager.success.rejected",
          ),
        );
        setSubmissions((prev) =>
          prev.map((s) => (s.id === res.data!.id ? res.data! : s)),
        );
        setSelected(null);
        setMessage("");
      }
    } catch {
      toast.error(t("manager.error.update"));
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = async () => {
    if (!selected || !message.trim()) {
      toast.error(t("manager.error.empty"));
      return;
    }
    setLoading(true);
    try {
      await notifySector(selected.id, message);
      toast.success(t("manager.success.sent"));
      setSelected(null);
      setMessage("");
    } catch {
      toast.error(t("manager.error.send"));
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Sector Name",
      "Type",
      "Status",
      "Collision",
      "Collision Details",
      "Submitted At",
    ];
    const rows = submissions.map((s) => [
      s.sectorName,
      s.sectorType,
      s.status,
      s.hasCollision ? "Yes" : "No",
      s.collisionDetails || "",
      new Date(s.submittedAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "all-submissions-report.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t("dashboard.export.success"));
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="gov-header">
        <div className="page-container py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary-foreground/70 text-xs font-medium mb-2">
                <Shield className="h-3.5 w-3.5" />
                <span className="uppercase tracking-wider">
                  {t("nav.manager")}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-primary-foreground">
                {t("manager.title")}
              </h1>
              <p className="text-primary-foreground/70 mt-1">
                {t("manager.subtitle")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={fetchData}
                className="gap-1.5"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${loadingData ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">
                  {t("dashboard.refresh")}
                </span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportCSV}
                className="gap-1.5"
              >
                <FileDown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {t("dashboard.export")}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container py-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              label: t("dashboard.stats.total"),
              value: stats.total,
              icon: TrendingUp,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              label: t("manager.stats.pending"),
              value: stats.pending,
              icon: Clock,
              color: "text-pending",
              bg: "bg-pending/10",
            },
            {
              label: t("manager.stats.collisions"),
              value: stats.collisions,
              icon: AlertTriangle,
              color: "text-collision",
              bg: "bg-collision/10",
            },
            {
              label: t("manager.stats.approved"),
              value: stats.approved,
              icon: CheckCircle,
              color: "text-approved",
              bg: "bg-approved/10",
            },
            {
              label: t("manager.stats.rejected"),
              value: stats.rejected,
              icon: XCircle,
              color: "text-rejected",
              bg: "bg-rejected/10",
            },
          ].map((st) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl ${st.bg} flex items-center justify-center`}
                    >
                      <st.icon className={`h-5 w-5 ${st.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-foreground">
                        {st.value}
                      </p>
                      <span className="text-[11px] text-muted-foreground font-medium">
                        {st.label}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts + Map row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pie chart */}
          <Card className="border-border">
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />{" "}
                {t("manager.chart.status")}
              </h3>
              <div className="h-48">
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        innerRadius={40}
                        paddingAngle={3}
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                    {t("manager.empty")}
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-muted-foreground">
                      {d.name} ({d.value})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bar chart */}
          <Card className="border-border">
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />{" "}
                {t("manager.chart.sectors")}
              </h3>
              <div className="h-48">
                {sectorCounts.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorCounts}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(220 18% 87%)"
                      />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="hsl(220 72% 30%)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                    {t("manager.empty")}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="border-border">
            <CardContent className="p-0">
              <div className="p-4 border-b border-border flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">
                  {t("dashboard.map")}
                </span>
              </div>
              <div className="h-64">
                <SubmissionMap
                  submissions={submissions}
                  onSelect={(sub) => {
                    setSelected(sub);
                    setMessage("");
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submission list */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex-wrap">
            <TabsTrigger value="pending" className="gap-1">
              <Clock className="h-3.5 w-3.5" /> {t("manager.tab.pending")} (
              {stats.pending})
            </TabsTrigger>
            <TabsTrigger value="collisions" className="gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />{" "}
              {t("manager.tab.collisions")} ({stats.collisions})
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-1">
              <CheckCircle className="h-3.5 w-3.5" />{" "}
              {t("manager.tab.approved")} ({stats.approved})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-1">
              <XCircle className="h-3.5 w-3.5" /> {t("manager.tab.rejected")} (
              {stats.rejected})
            </TabsTrigger>
            <TabsTrigger value="all">
              {t("manager.tab.all")} ({stats.total})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-4">
            {filtered.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-16 text-center text-muted-foreground">
                  <Filter className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-medium">{t("manager.empty")}</p>
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
                    <Card className="border-border hover:border-primary/30 hover:shadow-md transition-all">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-foreground truncate">
                                {sub.sectorName}
                              </h3>
                              {sub.hasCollision && (
                                <Badge
                                  variant="destructive"
                                  className="text-[10px] px-1.5 py-0 shrink-0"
                                >
                                  <AlertTriangle className="h-3 w-3 mr-0.5" />{" "}
                                  {t("manager.collision.label")}
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span className="capitalize font-medium">
                                {t(`sector.${sub.sectorType}`)}
                              </span>
                              <span className="flex items-center gap-1">
                                <StatusIcon status={sub.status} />
                                <span>{t(`status.${sub.status}`)}</span>
                              </span>
                              <span>
                                {new Date(sub.submittedAt).toLocaleDateString()}
                              </span>
                              {sub.coordinates.length > 0 && (
                                <span className="font-mono text-[11px]">
                                  {sub.coordinates[0].lat.toFixed(4)},{" "}
                                  {sub.coordinates[0].lng.toFixed(4)}
                                </span>
                              )}
                            </div>
                            {sub.collisionDetails && (
                              <p className="text-xs text-collision mt-2 truncate">
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
                            className="shrink-0 gap-1.5"
                          >
                            <Eye className="h-3.5 w-3.5" />{" "}
                            {t("manager.review")}
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

        {/* Review dialog — ONLY on manager page */}
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
                  <DialogTitle className="flex items-center gap-2 text-lg">
                    {selected.hasCollision ? (
                      <AlertTriangle className="h-5 w-5 text-collision" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-approved" />
                    )}
                    {t("manager.review.title")} — {selected.sectorName}
                  </DialogTitle>
                  <DialogDescription>
                    {selected.hasCollision
                      ? t("manager.collision.detected")
                      : t("manager.no.collision")}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  {selected.hasCollision && selected.collisionDetails && (
                    <div className="rounded-lg bg-collision/10 border border-collision/20 p-4 text-sm text-collision">
                      <strong>{t("manager.collision.details")}:</strong>{" "}
                      {selected.collisionDetails}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block mb-0.5">
                        {t("manager.field.type")}
                      </span>
                      <span className="capitalize font-semibold text-foreground">
                        {t(`sector.${selected.sectorType}`)}
                      </span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block mb-0.5">
                        {t("manager.field.status")}
                      </span>
                      <span
                        className={`status-badge status-${selected.status}`}
                      >
                        {t(`status.${selected.status}`)}
                      </span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block mb-0.5">
                        {t("manager.field.submitted")}
                      </span>
                      <span className="font-medium text-foreground">
                        {new Date(selected.submittedAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block mb-0.5">
                        {t("manager.field.points")}
                      </span>
                      <span className="font-medium text-foreground">
                        {selected.coordinates.length}
                      </span>
                    </div>
                  </div>

                  {selected.coordinates.length > 0 && (
                    <div className="bg-muted/30 rounded-lg p-3">
                      <span className="text-xs text-muted-foreground block mb-1">
                        {t("form.coordinates")}
                      </span>
                      <div className="max-h-24 overflow-y-auto space-y-0.5">
                        {selected.coordinates.map((c, i) => (
                          <div
                            key={i}
                            className="text-xs font-mono text-foreground"
                          >
                            #{i + 1}: {c.lat.toFixed(6)}, {c.lng.toFixed(6)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selected.managerMessage && (
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      <strong>{t("manager.field.prev.message")}:</strong>{" "}
                      {selected.managerMessage}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>{t("manager.message.label")}</Label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("manager.message.placeholder")}
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={handleNotify}
                    disabled={loading}
                    className="gap-1.5"
                  >
                    <MessageSquare className="h-4 w-4" />{" "}
                    {t("manager.btn.send")}
                  </Button>
                  <div className="flex gap-2 ml-auto">
                    <Button
                      variant="destructive"
                      onClick={() => handleAction("rejected")}
                      disabled={loading}
                      className="gap-1.5"
                    >
                      <XCircle className="h-4 w-4" /> {t("manager.btn.reject")}
                    </Button>
                    <Button
                      onClick={() => handleAction("approved")}
                      disabled={loading}
                      className="gap-1.5"
                    >
                      <CheckCircle className="h-4 w-4" />{" "}
                      {t("manager.btn.approve")}
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
