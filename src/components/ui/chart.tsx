import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

/* ---------------- THEMES ---------------- */
const THEMES = { light: "", dark: ".dark" } as const;

/* ---------------- TYPES ---------------- */
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

/* ---------------- CONTEXT ---------------- */
type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

/* ---------------- CONTAINER ---------------- */
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

/* ---------------- STYLE ---------------- */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.theme || cfg.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            return `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, item]) => {
    const color =
      item.theme?.[theme as keyof typeof item.theme] || item.color;
    return color ? `  --color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`;
          })
          .join("\n"),
      }}
    />
  );
};

/* ---------------- TOOLTIP ---------------- */
const ChartTooltip = RechartsPrimitive.Tooltip;

interface ChartTooltipContentProps extends React.ComponentProps<"div"> {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>((props: any, ref) => {
  const {
    active,
    payload,
    className,
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    nameKey,
    labelKey,
    ...rest
  } = props;

  const { config } = useChart();

  // ✅ SAFE FIX (Vercel-proof)
  const safePayload: any[] = Array.isArray(payload) ? payload : [];

  if (!active || safePayload.length === 0) return null;

  const tooltipLabel =
    hideLabel || safePayload.length === 0 ? null : label;

  return (
    <div ref={ref} className={cn("grid gap-1.5 p-2", className)} {...rest}>
      {tooltipLabel && (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter ? labelFormatter(tooltipLabel, safePayload) : tooltipLabel}
        </div>
      )}

      <div className="grid gap-1.5">
        {safePayload.map((item: any, index: number) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = config[key];
          const color = item.color || item.payload?.fill;

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-muted-foreground">
                {itemConfig?.label || item.name}
              </span>

              <span className="ml-auto font-mono">
                {item.value?.toLocaleString?.() ?? item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ChartTooltipContent.displayName = "ChartTooltip";

/* ---------------- LEGEND ---------------- */
const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    nameKey?: string;
    payload?: any[];
  }
>(({ className, payload, nameKey }, ref) => {
  const { config } = useChart();

  const safePayload: any[] = Array.isArray(payload) ? payload : [];

  if (!safePayload.length) return null;

  return (
    <div ref={ref} className={cn("flex gap-4", className)}>
      {safePayload.map((item: any, index: number) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = config[key];

        return (
          <div key={index} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span>{itemConfig?.label || item.value}</span>
          </div>
        );
      })}
    </div>
  );
});

ChartLegendContent.displayName = "ChartLegend";

/* ---------------- EXPORTS ---------------- */
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};