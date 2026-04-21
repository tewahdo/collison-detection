import { useEffect, useState } from "react";
import { Bell, CheckCircle, XCircle, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
  submission_id: string | null;
}

export default function NotificationBell() {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const unreadCount = items.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!user) return;
    fetchNotifications();
    const channel = supabase
      .channel("notifications-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchNotifications(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  async function fetchNotifications() {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setItems((data ?? []) as Notification[]);
  }

  async function markAllRead() {
    if (!user) return;
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    fetchNotifications();
  }

  async function markOneRead(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    fetchNotifications();
  }

  if (!user) return null;

  const iconFor = (type: string) => {
    if (type === "approval")
      return <CheckCircle className="h-4 w-4 text-approved" />;
    if (type === "rejection")
      return <XCircle className="h-4 w-4 text-rejected" />;
    return <MessageSquare className="h-4 w-4 text-primary" />;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center rounded-full bg-destructive text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <span className="text-sm font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllRead}
              className="h-7 text-xs"
            >
              <Check className="h-3 w-3 mr-1" /> Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {items.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            <div className="divide-y">
              {items.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markOneRead(n.id)}
                  className={`w-full text-left p-3 hover:bg-accent/30 transition flex gap-2 ${!n.is_read ? "bg-primary/5" : ""}`}
                >
                  <div className="mt-0.5">{iconFor(n.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {n.title}
                    </div>
                    {n.message && (
                      <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {n.message}
                      </div>
                    )}
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(n.created_at), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  {!n.is_read && (
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
