import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  Users,
  BarChart3,
  MapPin,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Layers,
  Database,
  Brain,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import aboutHero from "@/assets/about-hero.jpg";

export default function Services() {
  const { t } = useLanguage();

  const mainServices = [
    {
      icon: FileText,
      title: t("home.service1.title"),
      text: t("home.service1.text"),
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Search,
      title: t("home.service2.title"),
      text: t("home.service2.text"),
      color: "bg-destructive/10 text-destructive",
    },
    {
      icon: Users,
      title: t("home.service3.title"),
      text: t("home.service3.text"),
      color: "bg-accent/10 text-accent",
    },
    {
      icon: BarChart3,
      title: t("home.service4.title"),
      text: t("home.service4.text"),
      color: "bg-warning/10 text-warning",
    },
  ];

  const techFeatures = [
    {
      icon: Database,
      title: t("services.tech1.title"),
      text: t("services.tech1.text"),
    },
    {
      icon: Layers,
      title: t("services.tech2.title"),
      text: t("services.tech2.text"),
    },
    {
      icon: Brain,
      title: t("services.tech3.title"),
      text: t("services.tech3.text"),
    },
    {
      icon: Globe,
      title: t("services.tech4.title"),
      text: t("services.tech4.text"),
    },
    {
      icon: Shield,
      title: t("services.tech5.title"),
      text: t("services.tech5.text"),
    },
    {
      icon: Zap,
      title: t("services.tech6.title"),
      text: t("services.tech6.text"),
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={aboutHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative h-full flex items-center">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="uppercase tracking-wider text-xs font-bold text-primary-foreground/70">
                {t("home.services.badge")}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mt-2">
                {t("home.services.title")}
              </h1>
              <p className="text-primary-foreground/80 mt-3 max-w-2xl">
                {t("home.services.subtitle")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="page-container py-16">
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {mainServices.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div
                    className={`h-14 w-14 rounded-xl ${s.color} flex items-center justify-center mb-5`}
                  >
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {s.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technology */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {t("services.tech.badge")}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            {t("services.tech.heading")}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {techFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full border-border">
                <CardContent className="p-5 flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{f.text}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="px-8 h-12">
            <Link to="/login">
              {t("home.cta.login")} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
