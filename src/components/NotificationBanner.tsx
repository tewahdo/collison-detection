import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
}

export default function NotificationBanner() {
  const { user } = useAuth();
  const [unread, setUnread] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;
    fetchUnread();
    const channel = supabase
      .channel("banner-notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchUnread(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  async function fetchUnread() {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_read", false)
      .order("created_at", { ascending: false })
      .limit(3);
    setUnread((data ?? []) as Notification[]);
  }

  async function dismiss(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setUnread((u) => u.filter((n) => n.id !== id));
  }

  if (!user || unread.length === 0) return null;

  const styleFor = (type: string) => {
    if (type === "approval") {
      return {
        Icon: CheckCircle,
        classes: "border-approved/30 bg-approved/10 text-approved",
      };
    }
    if (type === "rejection") {
      return {
        Icon: XCircle,
        classes: "border-rejected/30 bg-rejected/10 text-rejected",
      };
    }
    return {
      Icon: MessageSquare,
      classes: "border-primary/30 bg-primary/10 text-primary",
    };
  };

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence>
        {unread.map((n) => {
          const { Icon, classes } = styleFor(n.type);
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`relative rounded-lg border p-3 pr-10 flex gap-3 ${classes}`}
            >
              <Icon className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground">
                  {n.title}
                </div>
                {n.message && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {n.message}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dismiss(n.id)}
                className="absolute top-1.5 right-1.5 h-7 w-7"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
