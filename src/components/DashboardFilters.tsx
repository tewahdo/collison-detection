import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { SectorType, SubmissionStatus } from "@/types/submission";

interface Filters {
  sector: string;
  status: string;
  collision: string;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export default function DashboardFilters({ filters, onChange }: Props) {
  const set = (key: keyof Filters, val: string) =>
    onChange({ ...filters, [key]: val });

  return (
    <div className="flex flex-wrap gap-3">
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Sector Type</Label>
        <Select value={filters.sector} onValueChange={(v) => set("sector", v)}>
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {[
              "airport",
              "asphalt",
              "railway",
              "pipeline",
              "powerline",
              "building",
              "other",
            ].map((t) => (
              <SelectItem key={t} value={t} className="capitalize">
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Status</Label>
        <Select value={filters.status} onValueChange={(v) => set("status", v)}>
          <SelectTrigger className="w-[130px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Collision</Label>
        <Select
          value={filters.collision}
          onValueChange={(v) => set("collision", v)}
        >
          <SelectTrigger className="w-[130px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Collision</SelectItem>
            <SelectItem value="no">No Collision</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
