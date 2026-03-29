// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Shield,
//   MapPin,
//   CheckCircle,
//   AlertTriangle,
//   ArrowRight,
//   Layers,
//   Eye,
//   Grid3X3,
// } from "lucide-react";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   const { t } = useLanguage();
//   const { user } = useAuth();

//   const features = [
//     {
//       icon: MapPin,
//       title: t("home.feature1.title"),
//       text: t("home.feature1.text"),
//       color: "text-primary",
//     },
//     {
//       icon: Eye,
//       title: t("home.feature2.title"),
//       text: t("home.feature2.text"),
//       color: "text-accent",
//     },
//     {
//       icon: Grid3X3,
//       title: t("home.feature3.title"),
//       text: t("home.feature3.text"),
//       color: "text-success",
//     },
//   ];

//   return (
//     <div className="bg-background">
//       {/* Hero */}
//       <section className="relative overflow-hidden border-b border-border">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
//         <div className="container px-4 py-20 md:py-28 relative">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
//               <Shield className="h-3.5 w-3.5" />
//               {t("common.gov")}
//             </div>
//             <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
//               {t("home.title")}
//             </h1>
//             <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
//               {t("home.subtitle")}
//             </p>
//             <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
//               {user ? (
//                 <Button asChild size="lg">
//                   <Link to="/submissions">
//                     {t("home.cta")} <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               ) : (
//                 <Button asChild size="lg">
//                   <Link to="/login">
//                     {t("home.cta.login")}{" "}
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               )}
//               <Button asChild variant="outline" size="lg">
//                 <Link to="/about">{t("nav.about")}</Link>
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Mission */}
//       <section className="py-16 border-b border-border">
//         <div className="container px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <h2 className="text-2xl font-bold text-foreground mb-4">
//               {t("home.mission.title")}
//             </h2>
//             <p className="text-muted-foreground leading-relaxed">
//               {t("home.mission.text")}
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-16 border-b border-border bg-muted/30">
//         <div className="container px-4">
//           <div className="grid md:grid-cols-3 gap-6">
//             {features.map((f, i) => (
//               <motion.div
//                 key={f.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-card border border-border rounded-lg p-6"
//               >
//                 <f.icon className={`h-8 w-8 ${f.color} mb-4`} />
//                 <h3 className="text-lg font-semibold text-foreground mb-2">
//                   {f.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">{f.text}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 border-t border-border">
//         <div className="container px-4 text-center">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <Shield className="h-4 w-4 text-primary" />
//             <span className="text-sm font-semibold text-foreground">
//               {t("common.appname")}
//             </span>
//           </div>
//           <p className="text-xs text-muted-foreground">
//             {t("common.copyright")}
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  MapPin,
  CheckCircle,
  ArrowRight,
  Eye,
  Grid3X3,
  FileText,
  Search,
  Users,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t } = useLanguage();
  const { user, userRole } = useAuth();

  const features = [
    {
      icon: MapPin,
      title: t("home.feature1.title"),
      text: t("home.feature1.text"),
    },
    {
      icon: Eye,
      title: t("home.feature2.title"),
      text: t("home.feature2.text"),
    },
    {
      icon: Grid3X3,
      title: t("home.feature3.title"),
      text: t("home.feature3.text"),
    },
  ];

  const services = [
    {
      icon: FileText,
      title: t("home.service1.title"),
      text: t("home.service1.text"),
    },
    {
      icon: Search,
      title: t("home.service2.title"),
      text: t("home.service2.text"),
    },
    {
      icon: Users,
      title: t("home.service3.title"),
      text: t("home.service3.text"),
    },
    {
      icon: BarChart3,
      title: t("home.service4.title"),
      text: t("home.service4.text"),
    },
  ];

  const dashboardPath =
    userRole === "manager" || userRole === "admin"
      ? "/manager"
      : "/submissions";

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container px-4 py-20 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 border border-primary/20">
              <Shield className="h-3.5 w-3.5" />
              {t("common.gov")}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              {t("home.title")}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("home.subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              {user ? (
                <Button asChild size="lg" className="px-8">
                  <Link to={dashboardPath}>
                    {t("home.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="px-8">
                  <Link to="/login">
                    {t("home.cta.login")}{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link to="/about">{t("nav.about")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 border-b border-border">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("home.mission.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("home.mission.text")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-border bg-muted/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 border-b border-border">
        <div className="container px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("home.services.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("home.services.subtitle")}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-5 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border bg-muted/20">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground">
                  {t("common.appname")}
                </span>
                <p className="text-[10px] text-muted-foreground">
                  {t("common.gov")}
                </p>
              </div>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link
                to="/about"
                className="hover:text-foreground transition-colors"
              >
                {t("nav.about")}
              </Link>
              <Link
                to="/contact"
                className="hover:text-foreground transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("common.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

