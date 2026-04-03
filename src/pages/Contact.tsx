

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
// import { useLanguage } from "@/i18n/LanguageContext";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// export default function Contact() {
//   const { t } = useLanguage();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       toast.success(t("common.success"));
//       setLoading(false);
//       (e.target as HTMLFormElement).reset();
//     }, 1000);
//   };

//   const info = [
//     {
//       icon: MapPin,
//       label: t("contact.address"),
//       value: t("contact.address.value"),
//     },
//     { icon: Phone, label: t("contact.phone"), value: t("contact.phone.value") },
//     { icon: Mail, label: t("contact.email"), value: t("contact.email.value") },
//     { icon: Clock, label: t("contact.hours"), value: t("contact.hours.value") },
//   ];

//   return (
//     <div className="bg-background min-h-screen">
//       {/* Page banner */}
//       <div className="border-b border-border bg-muted/30">
//         <div className="container px-4 py-8">
//           <h1 className="text-2xl font-bold text-foreground">
//             {t("contact.title")}
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             {t("contact.subtitle")}
//           </p>
//         </div>
//       </div>

//       <div className="container px-4 py-10 max-w-5xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Form */}
//             <Card className="border-border">
//               <CardContent className="p-6">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label>{t("contact.name")}</Label>
//                     <Input required />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>{t("contact.email")}</Label>
//                     <Input type="email" required />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>{t("contact.subject")}</Label>
//                     <Input required />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>{t("contact.message")}</Label>
//                     <Textarea rows={4} required />
//                   </div>
//                   <Button type="submit" className="w-full" disabled={loading}>
//                     <Send className="h-4 w-4 mr-2" />
//                     {loading ? t("common.loading") : t("contact.send")}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>

//             {/* Contact info */}
//             <div className="space-y-4">
//               {info.map((item) => (
//                 <div
//                   key={item.label}
//                   className="flex gap-4 items-start p-4 bg-card border border-border rounded-lg"
//                 >
//                   <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                     <item.icon className="h-5 w-5 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-foreground">
//                       {item.label}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       {item.value}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
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
      toast.success(t("contact.success"));
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  const info = [
    {
      icon: MapPin,
      label: t("contact.address"),
      value: t("contact.address.value"),
    },
    { icon: Phone, label: t("contact.phone"), value: t("contact.phone.value") },
    { icon: Mail, label: t("contact.email"), value: t("contact.email.value") },
    { icon: Clock, label: t("contact.hours"), value: t("contact.hours.value") },
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
              <MessageSquare className="h-4 w-4" />
              <span className="uppercase tracking-wider text-xs">
                {t("nav.contact")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
              {t("contact.title")}
            </h1>
            <p className="text-primary-foreground/80 mt-3 max-w-2xl">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="page-container py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card className="border-border shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    {t("contact.form.title")}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label>{t("contact.name")}</Label>
                        <Input
                          required
                          placeholder={t("contact.name.placeholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("contact.email")}</Label>
                        <Input
                          type="email"
                          required
                          placeholder={t("contact.email.placeholder")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("contact.subject")}</Label>
                      <Input
                        required
                        placeholder={t("contact.subject.placeholder")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("contact.message")}</Label>
                      <Textarea
                        rows={5}
                        required
                        placeholder={t("contact.message.placeholder")}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11"
                      disabled={loading}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {loading ? t("common.loading") : t("contact.send")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-foreground mb-4">
                {t("contact.info.title")}
              </h2>
              {info.map((item) => (
                <Card
                  key={item.label}
                  className="border-border hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Map embed placeholder */}
              <Card className="border-border overflow-hidden">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {t("contact.address.value")}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
