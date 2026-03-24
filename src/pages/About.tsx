import { motion } from "framer-motion";
import { Shield, Info, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="bg-background min-h-screen">
      <div className="container px-4 py-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("about.title")}
            </h1>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {t("about.intro")}
          </p>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            {t("about.how.title")}
          </h2>
          <div className="space-y-4 mb-8">
            {[
              t("about.how.step1"),
              t("about.how.step2"),
              t("about.how.step3"),
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            {t("about.purpose.title")}
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex gap-3 items-start">
              <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <p className="text-muted-foreground leading-relaxed">
                {t("about.purpose.text")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
