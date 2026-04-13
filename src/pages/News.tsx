import { motion } from "framer-motion";
import { Newspaper, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

import cardRailway from "@/assets/card-railway.jpg";
import cardAirport from "@/assets/card-airport.jpg";
import cardPowerline from "@/assets/card-powerline.jpg";
import cardTelecom from "@/assets/card-telecom.jpg";
import cardCoordination from "@/assets/card-coordination.jpg";
// import heroBanner from "@/assets/card-hero.jpg";
// import heroBanner from "@/assets/card-hero.jpg";
import heroBanner from "@/assets/about-hero.jpg";
export default function News() {
  const { t } = useLanguage();

  const articles = [
    {
      img: cardCoordination,
      title: t("home.news1.title"),
      desc: t("home.news1.desc"),
      date: "March 15, 2026",
      category: t("news.cat.system"),
    },
    {
      img: cardRailway,
      title: t("home.news2.title"),
      desc: t("home.news2.desc"),
      date: "February 22, 2026",
      category: t("news.cat.infra"),
    },
    {
      img: cardAirport,
      title: t("home.news3.title"),
      desc: t("home.news3.desc"),
      date: "January 10, 2026",
      category: t("news.cat.infra"),
    },
    {
      img: cardPowerline,
      title: t("news.article4.title"),
      desc: t("news.article4.desc"),
      date: "December 5, 2025",
      category: t("news.cat.energy"),
    },
    {
      img: cardTelecom,
      title: t("news.article5.title"),
      desc: t("news.article5.desc"),
      date: "November 18, 2025",
      category: t("news.cat.telecom"),
    },
    {
      img: heroBanner,
      title: t("news.article6.title"),
      desc: t("news.article6.desc"),
      date: "October 2, 2025",
      category: t("news.cat.policy"),
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="gov-header relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="page-container py-14 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-3">
              <Newspaper className="h-4 w-4" />
              <span className="uppercase tracking-wider text-xs font-bold">
                {t("home.quick.news")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
              {t("news.title")}
            </h1>
            <p className="text-primary-foreground/80 mt-3 max-w-2xl">
              {t("news.subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="overflow-hidden border-border hover:shadow-lg transition-all duration-300 group h-full">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {a.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {a.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {a.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
