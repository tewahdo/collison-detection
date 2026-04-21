import { motion } from "framer-motion";
import {
  HelpCircle,
  BookOpen,
  MapPin,
  ShieldCheck,
  MessageSquare,
  FileText,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import FeedbackDialog from "@/components/FeedbackDialog";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    items: [
      {
        q: "How do I create an account?",
        a: "Click Sign In on the top right, then choose Sign Up. Select your role (Sector User or Manager) and complete the form. You will receive an email confirmation.",
      },
      {
        q: "What is the difference between roles?",
        a: "Sector Users submit infrastructure projects for collision review. Managers review submissions, approve or reject them, and notify sectors. Admins manage data and roles.",
      },
      {
        q: "How do I sign in?",
        a: "Use the Sign In page with your registered email and password. Your assigned role determines which dashboard you can access.",
      },
    ],
  },
  {
    icon: MapPin,
    title: "Submitting a Sector",
    items: [
      {
        q: "How do I submit a new sector?",
        a: "Go to My Submissions, click New Submission, fill in the sector name, type, and coordinates (single point, line, or polygon), and submit. The system will automatically check for collisions.",
      },
      {
        q: 'What does "collision detected" mean?',
        a: "Your proposed sector overlaps or is within 50 meters of an existing infrastructure (airport, road, railway, power line, etc.). A manager will review and decide.",
      },
      {
        q: "Can I edit a submission after sending it?",
        a: "Submissions cannot be edited after being submitted to preserve audit history. Contact a manager if changes are needed.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Manager Review Process",
    items: [
      {
        q: "How long does review take?",
        a: "Most submissions are reviewed within 2–5 working days. Urgent collisions are prioritized.",
      },
      {
        q: "How will I be notified?",
        a: "You will receive an in-app notification (bell icon and dashboard banner) and an official email when a manager approves or rejects your submission.",
      },
      {
        q: "What happens if rejected?",
        a: "You will see the rejection reason in your dashboard and email. You may submit a revised proposal addressing the manager's feedback.",
      },
    ],
  },
  {
    icon: FileText,
    title: "Data & Reports",
    items: [
      {
        q: "Can I export my submissions?",
        a: "Yes. From the My Submissions page, click Export CSV to download a report of all your submissions and their status.",
      },
      {
        q: "Where can I see infrastructure data?",
        a: "The Submissions Map shows all approved infrastructure across the country. Use the filters to focus on specific sector types.",
      },
    ],
  },
];

export default function Help() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16 md:py-20">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-5 w-5" />
              <span className="text-xs uppercase tracking-widest font-semibold opacity-90">
                Help Center
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              How can we help you today?
            </h1>
            <p className="text-base md:text-lg opacity-90 max-w-2xl">
              Browse common questions, learn how to use the platform, and get in
              touch with our support team for the National Infrastructure
              Coordination System.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="page-container -mt-8 md:-mt-10 relative z-10">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { icon: BookOpen, label: "User Guides", href: "/services" },
            {
              icon: MessageSquare,
              label: "Send Feedback",
              action: "feedback" as const,
            },
            { icon: Mail, label: "Contact Support", href: "/contact" },
          ].map((c) => {
            const inner = (
              <Card className="hover:shadow-md transition cursor-pointer border-border/60">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{c.label}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            );
            if ("action" in c && c.action === "feedback") {
              return (
                <FeedbackDialog key={c.label} trigger={<div>{inner}</div>} />
              );
            }
            return (
              <Link key={c.label} to={c.href}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAQ sections */}
      <section className="page-container py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <s.icon className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <h2 className="text-lg font-semibold">{s.title}</h2>
                  </div>
                  <Accordion type="single" collapsible>
                    {s.items.map((it, k) => (
                      <AccordionItem key={k} value={`${i}-${k}`}>
                        <AccordionTrigger className="text-sm text-left">
                          {it.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {it.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-muted/40 border-t border-border py-12">
        <div className="page-container">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">
                Still need help?
              </h2>
              <p className="text-muted-foreground text-sm">
                Reach our support desk during business hours. We typically
                respond within 1 working day.
              </p>
            </div>
            <div className="flex gap-2">
              <FeedbackDialog
                trigger={
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-1.5" /> Send Feedback
                  </Button>
                }
              />
              <Link to="/contact">
                <Button>
                  <Phone className="h-4 w-4 mr-1.5" /> Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
