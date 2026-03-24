import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(t("common.success"));
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  const info = [
    {
      icon: MapPin,
      label: t("contact.address"),
      value: "Addis Ababa, Ethiopia",
    },
    { icon: Phone, label: t("contact.phone"), value: "+251-11-XXX-XXXX" },
    { icon: Mail, label: t("contact.email"), value: "info@collisionai.gov.et" },
    { icon: Clock, label: t("contact.hours"), value: t("contact.hours.value") },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="container px-4 py-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t("contact.title")}
          </h1>
          <p className="text-muted-foreground mb-8">{t("contact.subtitle")}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="border-border">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("contact.name")}</Label>
                    <Input required />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("contact.email")}</Label>
                    <Input type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("contact.subject")}</Label>
                    <Input required />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("contact.message")}</Label>
                    <Textarea rows={4} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    <Send className="h-4 w-4 mr-2" />
                    {loading ? t("common.loading") : t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact info */}
            <div className="space-y-4">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 items-start p-4 bg-card border border-border rounded-lg"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
