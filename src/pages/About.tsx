


// import { motion } from "framer-motion";
// import { Shield, Info, CheckCircle, Scale } from "lucide-react";
// import { useLanguage } from "@/i18n/LanguageContext";

// export default function About() {
//   const { t } = useLanguage();

//   return (
//     <div className="bg-background min-h-screen">
//       {/* Page banner */}
//       <div className="border-b border-border bg-muted/30">
//         <div className="container px-4 py-8">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//               <Info className="h-5 w-5 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-foreground">
//                 {t("about.title")}
//               </h1>
//               <p className="text-xs text-muted-foreground">{t("common.gov")}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container px-4 py-10 max-w-3xl mx-auto space-y-10">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <p className="text-muted-foreground leading-relaxed text-lg">
//             {t("about.intro")}
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//         >
//           <h2 className="text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
//             <Shield className="h-5 w-5 text-primary" />
//             {t("about.how.title")}
//           </h2>
//           <div className="space-y-4">
//             {[
//               t("about.how.step1"),
//               t("about.how.step2"),
//               t("about.how.step3"),
//             ].map((step, i) => (
//               <div
//                 key={i}
//                 className="flex gap-4 items-start p-4 bg-card border border-border rounded-lg"
//               >
//                 <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
//                   <span className="text-xs font-bold text-primary-foreground">
//                     {i + 1}
//                   </span>
//                 </div>
//                 <p className="text-muted-foreground leading-relaxed">{step}</p>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
//             <CheckCircle className="h-5 w-5 text-primary" />
//             {t("about.purpose.title")}
//           </h2>
//           <div className="bg-card border border-border rounded-lg p-6">
//             <p className="text-muted-foreground leading-relaxed">
//               {t("about.purpose.text")}
//             </p>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
//             <Scale className="h-5 w-5 text-primary" />
//             {t("about.legal.title")}
//           </h2>
//           <div className="bg-muted/50 border border-border rounded-lg p-6">
//             <p className="text-muted-foreground leading-relaxed text-sm">
//               {t("about.legal.text")}
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }




import { motion } from "framer-motion";
import {
  Shield,
  Info,
  CheckCircle,
  Scale,
  Target,
  Users,
  Globe,
  Building2,
  Award,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: t("about.value1.title"),
      text: t("about.value1.text"),
    },
    {
      icon: Users,
      title: t("about.value2.title"),
      text: t("about.value2.text"),
    },
    {
      icon: Globe,
      title: t("about.value3.title"),
      text: t("about.value3.text"),
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero banner */}
      <div className="gov-header relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="page-container py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm font-medium mb-3">
              <Info className="h-4 w-4" />
              <span className="uppercase tracking-wider text-xs">
                {t("nav.about")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
              {t("about.title")}
            </h1>
            <p className="text-primary-foreground/80 mt-3 max-w-2xl text-lg">
              {t("about.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-container py-16 space-y-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("about.intro")}
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {t("about.how.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              t("about.how.step1"),
              t("about.how.step2"),
              t("about.how.step3"),
            ].map((step, i) => (
              <Card
                key={i}
                className="border-border hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mb-4">
                    <span className="text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {t("about.values.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <Card
                key={i}
                className="border-border hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <v.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Purpose */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {t("about.purpose.title")}
            </h2>
          </div>
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex gap-6 items-start">
                <Building2 className="h-8 w-8 text-primary shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t("about.purpose.text")}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Legal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {t("about.legal.title")}
            </h2>
          </div>
          <div className="bg-muted/50 border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              {t("about.legal.text")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
