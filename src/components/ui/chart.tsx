'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { cn } from '@/lib/cn';

export type ChartConfig = Record<string, { label: React.ReactNode; color: string }>;

const ChartContext = React.createContext<ChartConfig | null>(null);

function useChart() {
  const config = React.useContext(ChartContext);

  if (!config) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return config;
}

/**
 * shadcn emits the `--color-<key>` variables through an injected style tag so it
 * can vary them per theme. This site ships dark only, so they go on the wrapper
 * as inline custom properties and inherit into the SVG, gradient stops included.
 */
export function ChartContainer({
  config,
  className,
  children,
}: {
  config: ChartConfig;
  className?: string;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}) {
  const colors = Object.fromEntries(
    Object.entries(config).map(([key, item]) => [`--color-${key}`, item.color]),
  ) as React.CSSProperties;

  return (
    <ChartContext.Provider value={config}>
      <div
        className={cn(
          'flex aspect-video justify-center text-xs',
          '[&_.recharts-cartesian-axis-tick_text]:fill-[var(--lr-faint)]',
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--lr-rule-soft)]",
          '[&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--lr-rule)]',
          '[&_.recharts-layer]:outline-none [&_.recharts-surface]:outline-none',
          className,
        )}
        style={colors}
      >
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
  valueFormatter?: (value: number) => string;
}) {
  const config = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="grid min-w-36 gap-1.5 rounded-md border border-[color:var(--lr-rule)] bg-[color:var(--lr-panel)] px-2.5 py-2 text-xs shadow-xl">
      <div className="font-medium text-[color:var(--lr-ink)]">
        {labelFormatter ? labelFormatter(label, payload) : label}
      </div>
      {payload.map((item) => {
        const key = String(item.dataKey ?? item.name);
        const series = config[key];
        const value = Number(item.value);

        return (
          <div key={key} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-[2px]"
              style={{ background: series?.color ?? item.color }}
            />
            <span className="flex-1 text-[color:var(--lr-dim)]">{series?.label ?? item.name}</span>
            <span className="font-mono tabular-nums text-[color:var(--lr-ink)]">
              {valueFormatter ? valueFormatter(value) : value.toLocaleString('en-US')}
            </span>
          </div>
        );
      })}
    </div>
  );
}
