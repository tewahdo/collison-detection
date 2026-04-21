import { useState, type ReactNode } from "react";
import { MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Props {
  trigger?: ReactNode;
}

export default function FeedbackDialog({ trigger }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("general");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!message.trim()) {
      toast.error("Please share your feedback message");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("feedback").insert({
      category,
      rating,
      message: message.trim(),
      email: email.trim() || user?.email || null,
      user_id: user?.id ?? null,
    });
    setLoading(false);
    if (error) {
      toast.error("Could not send feedback. Please try again.");
      return;
    }
    toast.success("Thank you! Your feedback has been recorded.");
    setOpen(false);
    setMessage("");
    setRating(5);
    setCategory("general");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm" className="gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" /> Feedback
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve the National Infrastructure Coordination System.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Comment</SelectItem>
                <SelectItem value="bug">Report a Bug</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="ui">UI / Design</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Your Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className="p-1 hover:scale-110 transition"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                >
                  <Star
                    className={`h-6 w-6 ${n <= rating ? "fill-pending text-pending" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fb-msg">Your Message</Label>
            <Textarea
              id="fb-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think, what works, what could be better…"
            />
          </div>

          {!user && (
            <div className="space-y-1.5">
              <Label htmlFor="fb-email">Email (optional)</Label>
              <Input
                id="fb-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending…" : "Send Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
