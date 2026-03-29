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
// useEffect(() => {
//   getSubmissions().then((res) => {
//     console.log("DATA FROM API:", res);
//     if (res.data) setSubmissions(res.data);
//   });
// }, []);
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
useEffect(() => {
  let isMounted = true;

  getSubmissions().then((res) => {
    if (isMounted && res.data) {
      console.log("DATA FROM API:", res);
      setSubmissions(res.data);
    }
  });

  return () => {
    isMounted = false;
  };
}, []);
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





// import { useState, useEffect, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { Map, Table2, Plus, Activity, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import SectorForm from '@/components/SectorForm';
// import SubmissionMap from '@/components/SubmissionMap';
// import SubmissionTable from '@/components/SubmissionTable';
// import SubmissionDetailDialog from '@/components/SubmissionDetailDialog';
// import DashboardFilters from '@/components/DashboardFilters';
// import AILocationRecommendation from '@/components/AILocationRecommendation';
// import { getSubmissions } from '@/services/api';
// import type { Submission } from '@/types/submission';
// import { useLanguage } from '@/i18n/LanguageContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';

// export default function Index() {
//   const { t } = useLanguage();
//   const { user } = useAuth();
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
//   const [detailOpen, setDetailOpen] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [filters, setFilters] = useState({ sector: 'all', status: 'all', collision: 'all' });

//   useEffect(() => {
//     getSubmissions().then(res => { if (res.data) setSubmissions(res.data); });
//   }, []);

//   const filtered = useMemo(() => {
//     return submissions.filter(s => {
//       if (filters.sector !== 'all' && s.sectorType !== filters.sector) return false;
//       if (filters.status !== 'all' && s.status !== filters.status) return false;
//       if (filters.collision === 'yes' && !s.hasCollision) return false;
//       if (filters.collision === 'no' && s.hasCollision) return false;
//       return true;
//     });
//   }, [submissions, filters]);

//   const handleSelect = (sub: Submission) => {
//     setSelectedSub(sub);
//     setDetailOpen(true);
//   };

//   const handleSubmitted = (sub: Submission) => {
//     setSubmissions(prev => [sub, ...prev]);
//     setShowForm(false);
//     if (sub.hasCollision) {
//       setSelectedSub(sub);
//       setDetailOpen(true);
//     }
//   };

//   const stats = {
//     total: submissions.length,
//     collisions: submissions.filter(s => s.hasCollision).length,
//     pending: submissions.filter(s => s.status === 'pending').length,
//     approved: submissions.filter(s => s.status === 'approved').length,
//   };

//   return (
//     <div className="bg-background min-h-screen">
//       <div className="border-b border-border bg-muted/30">
//         <div className="container px-4 py-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-foreground">
//               <Map className="h-6 w-6 text-primary" />
//               {t('dashboard.title')}
//             </h1>
//             <p className="text-sm text-muted-foreground mt-1">{t('dashboard.subtitle')}</p>
//           </div>
//           <Button onClick={() => setShowForm(!showForm)} size="sm">
//             <Plus className="h-3.5 w-3.5 mr-1.5" />
//             {t('dashboard.new')}
//           </Button>
//         </div>
//       </div>

//       <main className="container px-4 py-6 space-y-6">
//         {submissions.length === 0 && !showForm && (
//           <Card className="border-primary/20 bg-primary/5">
//             <CardContent className="p-6 text-center">
//               <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
//               <h2 className="text-lg font-semibold text-foreground mb-1">{t('dashboard.welcome')}</h2>
//               <p className="text-sm text-muted-foreground mb-4">{t('dashboard.welcome.text')}</p>
//               <Button onClick={() => setShowForm(true)} size="sm">
//                 <Plus className="h-3.5 w-3.5 mr-1.5" /> {t('dashboard.new')}
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//           {[
//             { label: t('dashboard.stats.total'), value: stats.total, icon: Activity, color: 'text-primary' },
//             { label: t('dashboard.stats.collisions'), value: stats.collisions, icon: AlertTriangle, color: 'text-collision' },
//             { label: t('dashboard.stats.pending'), value: stats.pending, icon: Clock, color: 'text-pending' },
//             { label: t('dashboard.stats.approved'), value: stats.approved, icon: CheckCircle, color: 'text-approved' },
//           ].map(st => (
//             <motion.div
//               key={st.label}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-card border border-border rounded-lg p-4"
//             >
//               <div className="flex items-center gap-2 mb-1">
//                 <st.icon className={`h-4 w-4 ${st.color}`} />
//                 <span className="text-xs text-muted-foreground font-medium">{st.label}</span>
//               </div>
//               <p className="text-2xl font-bold text-foreground">{st.value}</p>
//             </motion.div>
//           ))}
//         </div>

//         {showForm && (
//           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
//             <SectorForm onSubmitted={handleSubmitted} />
//           </motion.div>
//         )}

//         {/* AI Location Recommendation */}
//         <AILocationRecommendation submissions={submissions} />

//         <Tabs defaultValue="map">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
//             <TabsList>
//               <TabsTrigger value="map" className="gap-1.5"><Map className="h-3.5 w-3.5" /> {t('dashboard.map')}</TabsTrigger>
//               <TabsTrigger value="table" className="gap-1.5"><Table2 className="h-3.5 w-3.5" /> {t('dashboard.table')}</TabsTrigger>
//             </TabsList>
//             <DashboardFilters filters={filters} onChange={setFilters} />
//           </div>

//           <TabsContent value="map">
//             <SubmissionMap submissions={filtered} onSelect={handleSelect} />
//           </TabsContent>
//           <TabsContent value="table">
//             <SubmissionTable submissions={filtered} onSelect={handleSelect} />
//           </TabsContent>
//         </Tabs>
//       </main>

//       {/* Read-only detail dialog — no approve/reject */}
//       <SubmissionDetailDialog
//         submission={selectedSub}
//         open={detailOpen}
//         onClose={() => setDetailOpen(false)}
//       />
//     </div>
//   );
// }
