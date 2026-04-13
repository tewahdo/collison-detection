






// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Shield,
//   MapPin,
//   CheckCircle,
//   ArrowRight,
//   Eye,
//   Grid3X3,
//   FileText,
//   Search,
//   Users,
//   BarChart3,
//   Globe,
//   Zap,
//   Lock,
//   TrendingUp,
//   Building2,
//   Plane,
//   TrainFront,
//   Cable,
// } from "lucide-react";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// export default function Home() {
//   const { t } = useLanguage();
//   const { user, userRole } = useAuth();

//   const features = [
//     {
//       icon: MapPin,
//       title: t("home.feature1.title"),
//       text: t("home.feature1.text"),
//     },
//     {
//       icon: Eye,
//       title: t("home.feature2.title"),
//       text: t("home.feature2.text"),
//     },
//     {
//       icon: Grid3X3,
//       title: t("home.feature3.title"),
//       text: t("home.feature3.text"),
//     },
//     {
//       icon: Lock,
//       title: t("home.feature4.title"),
//       text: t("home.feature4.text"),
//     },
//     {
//       icon: Zap,
//       title: t("home.feature5.title"),
//       text: t("home.feature5.text"),
//     },
//     {
//       icon: Globe,
//       title: t("home.feature6.title"),
//       text: t("home.feature6.text"),
//     },
//   ];

//   const services = [
//     {
//       icon: FileText,
//       title: t("home.service1.title"),
//       text: t("home.service1.text"),
//     },
//     {
//       icon: Search,
//       title: t("home.service2.title"),
//       text: t("home.service2.text"),
//     },
//     {
//       icon: Users,
//       title: t("home.service3.title"),
//       text: t("home.service3.text"),
//     },
//     {
//       icon: BarChart3,
//       title: t("home.service4.title"),
//       text: t("home.service4.text"),
//     },
//   ];

//   const infraTypes = [
//     { icon: Plane, label: t("sector.airport") },
//     { icon: TrainFront, label: t("sector.railway") },
//     { icon: Cable, label: t("sector.powerline") },
//     { icon: Building2, label: t("sector.building") },
//   ];

//   const dashboardPath =
//     userRole === "manager" || userRole === "admin"
//       ? "/manager"
//       : "/submissions";

//   return (
//     <div className="bg-background">
//       {/* Ethiopian flag stripe */}
//       <div className="gov-stripe" />

//       {/* Hero */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
//         <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
//         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

//         <div className="page-container py-20 md:py-28 lg:py-36 relative">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20 tracking-wide uppercase">
//               <Shield className="h-3.5 w-3.5" />
//               {t("common.gov")}
//             </div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
//               {t("home.title")}
//             </h1>
//             <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
//               {t("home.subtitle")}
//             </p>
//             <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
//               {user ? (
//                 <Button
//                   asChild
//                   size="lg"
//                   className="px-10 h-12 text-base font-semibold shadow-lg shadow-primary/20"
//                 >
//                   <Link to={dashboardPath}>
//                     {t("home.cta")} <ArrowRight className="ml-2 h-5 w-5" />
//                   </Link>
//                 </Button>
//               ) : (
//                 <Button
//                   asChild
//                   size="lg"
//                   className="px-10 h-12 text-base font-semibold shadow-lg shadow-primary/20"
//                 >
//                   <Link to="/login">
//                     {t("home.cta.login")}{" "}
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </Link>
//                 </Button>
//               )}
//               <Button
//                 asChild
//                 variant="outline"
//                 size="lg"
//                 className="h-12 px-8 text-base"
//               >
//                 <Link to="/about">{t("nav.about")}</Link>
//               </Button>
//             </div>
//           </motion.div>

//           {/* Infrastructure type pills */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="mt-16 flex flex-wrap justify-center gap-3"
//           >
//             {infraTypes.map((inf, i) => (
//               <div
//                 key={i}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm"
//               >
//                 <inf.icon className="h-4 w-4 text-primary" />
//                 {inf.label}
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Stats bar */}
//       <section className="border-y border-border bg-primary/[0.03]">
//         <div className="page-container py-10">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { value: "9+", label: t("home.stat.infra"), icon: Building2 },
//               { value: "50m", label: t("home.stat.precision"), icon: MapPin },
//               { value: "AI", label: t("home.stat.ai"), icon: Zap },
//               { value: "24/7", label: t("home.stat.uptime"), icon: TrendingUp },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 15 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 mb-3">
//                   <stat.icon className="h-5 w-5 text-primary" />
//                 </div>
//                 <p className="text-2xl md:text-3xl font-extrabold text-foreground">
//                   {stat.value}
//                 </p>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   {stat.label}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission */}
//       <section className="py-20">
//         <div className="page-container">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <span className="text-xs font-bold uppercase tracking-widest text-primary">
//               {t("home.mission.badge")}
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
//               {t("home.mission.title")}
//             </h2>
//             <p className="text-lg text-muted-foreground leading-relaxed">
//               {t("home.mission.text")}
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-20 bg-muted/30 border-y border-border">
//         <div className="page-container">
//           <div className="text-center mb-14">
//             <span className="text-xs font-bold uppercase tracking-widest text-primary">
//               {t("home.features.badge")}
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
//               {t("home.features.heading")}
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((f, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.08 }}
//               >
//                 <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
//                   <CardContent className="p-6">
//                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
//                       <f.icon className="h-6 w-6 text-primary" />
//                     </div>
//                     <h3 className="text-lg font-bold text-foreground mb-2">
//                       {f.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {f.text}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How it works */}
//       <section className="py-20">
//         <div className="page-container">
//           <div className="text-center mb-14">
//             <span className="text-xs font-bold uppercase tracking-widest text-primary">
//               {t("home.how.badge")}
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
//               {t("home.how.heading")}
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {[
//               {
//                 step: "01",
//                 title: t("home.how.step1.title"),
//                 desc: t("home.how.step1.desc"),
//                 icon: FileText,
//               },
//               {
//                 step: "02",
//                 title: t("home.how.step2.title"),
//                 desc: t("home.how.step2.desc"),
//                 icon: Search,
//               },
//               {
//                 step: "03",
//                 title: t("home.how.step3.title"),
//                 desc: t("home.how.step3.desc"),
//                 icon: CheckCircle,
//               },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.15 }}
//                 className="text-center"
//               >
//                 <div className="relative inline-block mb-6">
//                   <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
//                     <item.icon className="h-7 w-7 text-primary-foreground" />
//                   </div>
//                   <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-card border-2 border-primary text-primary text-xs font-bold flex items-center justify-center">
//                     {item.step}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-bold text-foreground mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground leading-relaxed">
//                   {item.desc}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Services */}
//       <section className="py-20 bg-primary/[0.03] border-y border-border">
//         <div className="page-container">
//           <div className="text-center mb-14">
//             <span className="text-xs font-bold uppercase tracking-widest text-primary">
//               {t("home.services.badge")}
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
//               {t("home.services.title")}
//             </h2>
//             <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
//               {t("home.services.subtitle")}
//             </p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((s, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 16 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.08 }}
//               >
//                 <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
//                   <CardContent className="p-6">
//                     <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
//                       <s.icon className="h-6 w-6 text-primary" />
//                     </div>
//                     <h3 className="font-bold text-foreground mb-2">
//                       {s.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {s.text}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20">
//         <div className="page-container">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-border p-10 md:p-16">
//               <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
//               <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
//                 {t("home.cta.heading")}
//               </h2>
//               <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
//                 {t("home.cta.text")}
//               </p>
//               {user ? (
//                 <Button
//                   asChild
//                   size="lg"
//                   className="px-10 h-12 text-base font-semibold"
//                 >
//                   <Link to={dashboardPath}>
//                     {t("home.cta")} <ArrowRight className="ml-2 h-5 w-5" />
//                   </Link>
//                 </Button>
//               ) : (
//                 <Button
//                   asChild
//                   size="lg"
//                   className="px-10 h-12 text-base font-semibold"
//                 >
//                   <Link to="/login">
//                     {t("home.cta.login")}{" "}
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </Link>
//                 </Button>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-border bg-card">
//         <div className="gov-stripe" />
//         <div className="page-container py-12">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
//                   <Shield className="h-5 w-5 text-primary-foreground" />
//                 </div>
//                 <div>
//                   <span className="text-sm font-bold text-foreground">
//                     {t("common.appname")}
//                   </span>
//                   <p className="text-[11px] text-muted-foreground">
//                     {t("common.gov")}
//                   </p>
//                 </div>
//               </div>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 {t("home.footer.desc")}
//               </p>
//             </div>
//             <div>
//               <h4 className="text-sm font-bold text-foreground mb-4">
//                 {t("home.footer.links")}
//               </h4>
//               <div className="space-y-2">
//                 <Link
//                   to="/about"
//                   className="block text-sm text-muted-foreground hover:text-primary transition-colors"
//                 >
//                   {t("nav.about")}
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className="block text-sm text-muted-foreground hover:text-primary transition-colors"
//                 >
//                   {t("nav.contact")}
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="block text-sm text-muted-foreground hover:text-primary transition-colors"
//                 >
//                   {t("nav.login")}
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <h4 className="text-sm font-bold text-foreground mb-4">
//                 {t("home.footer.contact")}
//               </h4>
//               <div className="space-y-2 text-sm text-muted-foreground">
//                 <p>{t("contact.address.value")}</p>
//                 <p>{t("contact.phone.value")}</p>
//                 <p>{t("contact.email.value")}</p>
//               </div>
//             </div>
//           </div>
//           <div className="mt-10 pt-6 border-t border-border text-center">
//             <p className="text-xs text-muted-foreground">
//               {t("common.copyright")}
//             </p>
//           </div>
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
  Globe,
  Zap,
  Lock,
  TrendingUp,
  Building2,
  Plane,
  TrainFront,
  Cable,
  ChevronRight,
  Newspaper,
  BookOpen,
  Phone,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import heroBanner from "@/assets/about-hero.jpg";
import cardRailway from "@/assets/card-railway.jpg";
import cardAirport from "@/assets/card-airport.jpg";
import cardPowerline from "@/assets/card-powerline.jpg";
import cardTelecom from "@/assets/card-telecom.jpg";
import cardCoordination from "@/assets/card-coordination.jpg";
import govEmblem from "@/assets/gov-emblem.png";

export default function Home() {
  const { t } = useLanguage();
  const { user, userRole } = useAuth();
  const dashboardPath =
    userRole === "manager" || userRole === "admin"
      ? "/manager"
      : "/submissions";

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
    {
      icon: Lock,
      title: t("home.feature4.title"),
      text: t("home.feature4.text"),
    },
    {
      icon: Zap,
      title: t("home.feature5.title"),
      text: t("home.feature5.text"),
    },
    {
      icon: Globe,
      title: t("home.feature6.title"),
      text: t("home.feature6.text"),
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

  const newsItems = [
    {
      img: cardCoordination,
      title: t("home.news1.title"),
      desc: t("home.news1.desc"),
      date: "March 2026",
    },
    {
      img: cardRailway,
      title: t("home.news2.title"),
      desc: t("home.news2.desc"),
      date: "February 2026",
    },
    {
      img: cardAirport,
      title: t("home.news3.title"),
      desc: t("home.news3.desc"),
      date: "January 2026",
    },
  ];

  const infraCards = [
    { img: cardAirport, title: t("sector.airport"), link: "/about" },
    { img: cardRailway, title: t("sector.railway"), link: "/about" },
    { img: cardPowerline, title: t("sector.powerline"), link: "/about" },
    { img: cardTelecom, title: t("home.infra.telecom"), link: "/about" },
  ];

  return (
    <div className="bg-background">
      {/* Official gov banner */}
      <div className="bg-primary/5 border-b border-border">
        <div className="page-container flex items-center gap-2 py-1.5 text-xs text-muted-foreground">
          <img src={govEmblem} alt="" className="h-5 w-5" />
          <span>{t("home.official.banner")}</span>
        </div>
      </div>

      {/* Ethiopian flag stripe */}
      <div className="gov-stripe" />

      {/* Full-width Hero Banner */}
      <section className="relative h-[520px] md:h-[600px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Infrastructure"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/30" />
        <div className="relative h-full flex items-center">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.1] drop-shadow-lg">
                {t("home.title")}
              </h1>
              <p className="mt-5 text-base md:text-lg text-primary-foreground/90 max-w-xl leading-relaxed">
                {t("home.subtitle")}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {user ? (
                  <Button
                    asChild
                    size="lg"
                    className="px-8 h-12 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl"
                  >
                    <Link to={dashboardPath}>
                      {t("home.cta")} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="lg"
                    className="px-8 h-12 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl"
                  >
                    <Link to="/login">
                      {t("home.cta.login")}{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 text-base bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Link to="/about">{t("nav.about")}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links Bar (EU style) */}
      <section className="border-b border-border bg-card shadow-sm">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 -mx-px">
            {[
              { icon: Newspaper, label: t("home.quick.news"), to: "/news" },
              {
                icon: BookOpen,
                label: t("home.quick.services"),
                to: "/services",
              },
              { icon: Search, label: t("home.quick.faq"), to: "/faq" },
              { icon: Phone, label: t("nav.contact"), to: "/contact" },
            ].map((q, i) => (
              <Link
                key={i}
                to={q.to}
                className="flex items-center gap-3 px-5 py-4 border-r border-border last:border-r-0 hover:bg-primary/5 transition-colors group"
              >
                <q.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {q.label}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Sectors Grid (like EU cards) */}
      <section className="py-16">
        <div className="page-container">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {t("home.infra.badge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
              {t("home.infra.heading")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infraCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={card.link} className="group block">
                  <Card className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {card.title}
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-primary">
        <div className="page-container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "9+", label: t("home.stat.infra"), icon: Building2 },
              { value: "50m", label: t("home.stat.precision"), icon: MapPin },
              { value: "AI", label: t("home.stat.ai"), icon: Zap },
              { value: "24/7", label: t("home.stat.uptime"), icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary-foreground/15 mb-3">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/70 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {t("home.mission.badge")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-5">
                {t("home.mission.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t("home.mission.text")}
              </p>
              <div className="mt-6">
                <Button asChild variant="outline" className="group">
                  <Link to="/about">
                    {t("home.learn.more")}{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={cardCoordination}
                alt="Coordination"
                className="rounded-xl shadow-xl w-full"
                loading="lazy"
                width={800}
                height={600}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="page-container">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {t("home.features.badge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
              {t("home.features.heading")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="page-container">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {t("home.how.badge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
              {t("home.how.heading")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: t("home.how.step1.title"),
                desc: t("home.how.step1.desc"),
                icon: FileText,
              },
              {
                step: "02",
                title: t("home.how.step2.title"),
                desc: t("home.how.step2.desc"),
                icon: Search,
              },
              {
                step: "03",
                title: t("home.how.step3.title"),
                desc: t("home.how.step3.desc"),
                icon: CheckCircle,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-block mb-5">
                  <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                    <item.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-card border-2 border-primary text-primary text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates (EU style) */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {t("home.news.badge")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t("home.news.heading")}
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex group">
              <Link to="/news">
                {t("home.news.all")}{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((news, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden border-border hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={news.img}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                  <CardContent className="p-5">
                    <p className="text-xs text-muted-foreground mb-2">
                      {news.date}
                    </p>
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {news.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="page-container">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {t("home.services.badge")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
              {t("home.services.title")}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
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
              >
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Shield className="h-12 w-12 text-primary-foreground/80 mx-auto mb-5" />
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              {t("home.cta.heading")}
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              {t("home.cta.text")}
            </p>
            {user ? (
              <Button
                asChild
                size="lg"
                className="px-10 h-12 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to={dashboardPath}>
                  {t("home.cta")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="px-10 h-12 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/login">
                  {t("home.cta.login")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="gov-stripe" />
        <div className="page-container py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={govEmblem} alt="" className="h-10 w-10" />
                <div>
                  <span className="text-sm font-bold text-foreground">
                    {t("common.appname")}
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    {t("common.gov")}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("home.footer.desc")}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">
                {t("home.footer.links")}
              </h4>
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.about")}
                </Link>
                <Link
                  to="/services"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("home.quick.services")}
                </Link>
                <Link
                  to="/news"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("home.quick.news")}
                </Link>
                <Link
                  to="/faq"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("home.quick.faq")}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">
                {t("home.footer.resources")}
              </h4>
              <div className="space-y-2">
                <Link
                  to="/contact"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.contact")}
                </Link>
                <Link
                  to="/login"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.login")}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">
                {t("home.footer.contact")}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{t("contact.address.value")}</p>
                <p>{t("contact.phone.value")}</p>
                <p>{t("contact.email.value")}</p>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              {t("common.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
