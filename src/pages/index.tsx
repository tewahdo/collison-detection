import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Shield, Map, Table2, Plus, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectorForm from "@/components/SectorForm";
import SubmissionMap from "@/components/SubmissionMap";
import SubmissionTable from "@/components/SubmissionTable";
import ManagerNotification from "@/components/ManagerNotification";
import DashboardFilters from "@/components/DashboardFilters";
import { getSubmissions } from "@/services/api";
import type { Submission } from "@/types/submission";

export default function Index() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    sector: "all",
    status: "all",
    collision: "all",
  });
useEffect(() => {
  getSubmissions().then((res) => {
    console.log("DATA FROM API:", res);
    if (res.data) setSubmissions(res.data);
  });
}, []);
  useEffect(() => {
    getSubmissions().then((res) => {
      if (res.data) setSubmissions(res.data);
    });
  }, []);

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (filters.sector !== "all" && s.sectorType !== filters.sector)
        return false;
      if (filters.status !== "all" && s.status !== filters.status) return false;
      if (filters.collision === "yes" && !s.hasCollision) return false;
      if (filters.collision === "no" && s.hasCollision) return false;
      return true;
    });
  }, [submissions, filters]);

  const handleSelect = (sub: Submission) => {
    setSelectedSub(sub);
    setModalOpen(true);
  };

  const handleSubmitted = (sub: Submission) => {
    setSubmissions((prev) => [sub, ...prev]);
    setShowForm(false);
    if (sub.hasCollision) {
      setSelectedSub(sub);
      setModalOpen(true);
    }
  };

  const handleUpdated = (updated: Submission) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s)),
    );
  };

  const stats = {
    total: submissions.length,
    collisions: submissions.filter((s) => s.hasCollision).length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-base font-bold tracking-tight">
              Collision Detection AI
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Submission
          </button>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Total",
              value: stats.total,
              icon: Activity,
              color: "text-primary",
            },
            {
              label: "Collisions",
              value: stats.collisions,
              icon: Shield,
              color: "text-collision",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Activity,
              color: "text-pending",
            },
            {
              label: "Approved",
              value: stats.approved,
              icon: Activity,
              color: "text-approved",
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

        {/* Form panel */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <SectorForm onSubmitted={handleSubmitted} />
          </motion.div>
        )}

        {/* Dashboard tabs */}
        <Tabs defaultValue="map">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <TabsList>
              <TabsTrigger value="map" className="gap-1.5">
                <Map className="h-3.5 w-3.5" /> Map
              </TabsTrigger>
              <TabsTrigger value="table" className="gap-1.5">
                <Table2 className="h-3.5 w-3.5" /> Table
              </TabsTrigger>
            </TabsList>
            <DashboardFilters filters={filters} onChange={setFilters} />
          </div>

          <TabsContent value="map">
            <SubmissionMap submissions={filtered} onSelect={handleSelect} />
          </TabsContent>
          <TabsContent value="table">
            <SubmissionTable submissions={filtered} onSelect={handleSelect} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Manager modal */}
      <ManagerNotification
        submission={selectedSub}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}
