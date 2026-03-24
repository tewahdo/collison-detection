import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  MapPin,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Layers,
  Eye,
  Grid3X3,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const features = [
    {
      icon: MapPin,
      title: t("home.feature1.title"),
      text: t("home.feature1.text"),
      color: "text-primary",
    },
    {
      icon: Eye,
      title: t("home.feature2.title"),
      text: t("home.feature2.text"),
      color: "text-accent",
    },
    {
      icon: Grid3X3,
      title: t("home.feature3.title"),
      text: t("home.feature3.text"),
      color: "text-success",
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container px-4 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <Shield className="h-3.5 w-3.5" />
              {t("common.gov")}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              {t("home.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              {user ? (
                <Button asChild size="lg">
                  <Link to="/submissions">
                    {t("home.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg">
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
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <f.icon className={`h-8 w-8 ${f.color} mb-4`} />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {t("common.appname")}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("common.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
