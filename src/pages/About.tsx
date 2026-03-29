// import { motion } from "framer-motion";
// import { Shield, Info, CheckCircle } from "lucide-react";
// import { useLanguage } from "@/i18n/LanguageContext";

// export default function About() {
//   const { t } = useLanguage();

//   return (
//     <div className="bg-background min-h-screen">
//       <div className="container px-4 py-10 max-w-3xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//               <Info className="h-5 w-5 text-primary" />
//             </div>
//             <h1 className="text-2xl font-bold text-foreground">
//               {t("about.title")}
//             </h1>
//           </div>

//           <p className="text-muted-foreground leading-relaxed mb-8">
//             {t("about.intro")}
//           </p>

//           <h2 className="text-xl font-semibold text-foreground mb-4">
//             {t("about.how.title")}
//           </h2>
//           <div className="space-y-4 mb-8">
//             {[
//               t("about.how.step1"),
//               t("about.how.step2"),
//               t("about.how.step3"),
//             ].map((step, i) => (
//               <div key={i} className="flex gap-3 items-start">
//                 <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
//                   <span className="text-xs font-bold text-primary">
//                     {i + 1}
//                   </span>
//                 </div>
//                 <p className="text-muted-foreground">{step}</p>
//               </div>
//             ))}
//           </div>

//           <h2 className="text-xl font-semibold text-foreground mb-4">
//             {t("about.purpose.title")}
//           </h2>
//           <div className="bg-card border border-border rounded-lg p-6">
//             <div className="flex gap-3 items-start">
//               <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
//               <p className="text-muted-foreground leading-relaxed">
//                 {t("about.purpose.text")}
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }



import { motion } from "framer-motion";
import { Shield, Info, CheckCircle, Scale } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="bg-background min-h-screen">
      {/* Page banner */}
      <div className="border-b border-border bg-muted/30">
        <div className="container px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t("about.title")}
              </h1>
              <p className="text-xs text-muted-foreground">{t("common.gov")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-10 max-w-3xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground leading-relaxed text-lg">
            {t("about.intro")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {t("about.how.title")}
          </h2>
          <div className="space-y-4">
            {[
              t("about.how.step1"),
              t("about.how.step2"),
              t("about.how.step3"),
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 bg-card border border-border rounded-lg"
              >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            {t("about.purpose.title")}
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground leading-relaxed">
              {t("about.purpose.text")}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            {t("about.legal.title")}
          </h2>
          <div className="bg-muted/50 border border-border rounded-lg p-6">
            <p className="text-muted-foreground leading-relaxed text-sm">
              {t("about.legal.text")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
