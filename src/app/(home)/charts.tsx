export interface Row {
  label: string;
  value: number;
  display: string;
  /** The langonrock path. Carries the accent; everything else is context. */
  accent?: boolean;
}

interface ChartProps {
  title: string;
  rows: Row[];
  max: number;
  axis: string;
  unit: string;
}

function Caption({ title, axis }: { title: string; axis: string }) {
  return (
    <figcaption className="lr-figcaption">
      <b>{title}</b>
      <span className="lr-mono">0 – {axis}</span>
    </figcaption>
  );
}

/**
 * The bars live inside a real table, so the chart and its table view are the
 * same DOM. A screen reader reads labels and values; nobody needs a separate
 * accessible twin that can drift out of sync with the numbers beside it.
 */
export function BarChart({ title, rows, max, axis, unit }: ChartProps) {
  return (
    <figure className="lr-figure">
      <Caption title={title} axis={axis} />

      <table className="lr-chart">
        <caption className="sr-only">
          {title}, measured in {unit}
        </caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="lr-chart-label">
                {row.label}
              </th>
              <td className="lr-chart-cell">
                <span className="lr-track" aria-hidden="true">
                  <span
                    className={row.accent ? 'lr-fill lr-fill-accent' : 'lr-fill'}
                    style={{ width: `${Math.max((row.value / max) * 100, 0.6)}%` }}
                  />
                </span>
              </td>
              <td className="lr-chart-value">{row.display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

interface GroupedProps {
  title: string;
  axis: string;
  unit: string;
  groups: { label: string; whole: Row; slice: Row }[];
  max: number;
}

export function GroupedBarChart({ title, axis, unit, groups, max }: GroupedProps) {
  return (
    <figure className="lr-figure">
      <Caption title={title} axis={axis} />

      <table className="lr-chart">
        <caption className="sr-only">
          {title}, measured in {unit}
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Concepts in the tenant</th>
            <th scope="col">Series</th>
            <th scope="col">Tokens</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) =>
            [group.whole, group.slice].map((row, index) => (
              <tr key={`${group.label}-${row.label}`}>
                <th scope="row" className="lr-chart-label">
                  {index === 0 ? group.label : <span className="sr-only">{group.label}</span>}
                </th>
                <td className="lr-chart-cell">
                  <span className="lr-track" aria-hidden="true">
                    <span
                      className={row.accent ? 'lr-fill lr-fill-accent' : 'lr-fill'}
                      style={{ width: `${Math.max((row.value / max) * 100, 0.6)}%` }}
                    />
                  </span>
                  <span className="sr-only">{row.label}</span>
                </td>
                <td className="lr-chart-value">{row.display}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </figure>
  );
}

export interface DotRow {
  label: string;
  /** Where the raw-file baseline lands, 0 to 100. */
  base: number;
  /** Where langonrock lands, 0 to 100. */
  store: number;
  display: string;
}

interface DotPlotProps {
  title: string;
  axis: string;
  unit: string;
  rows: DotRow[];
}

/**
 * Rates against a fixed ceiling. A zero-baseline bar renders 70 against 75 as
 * two near-identical lengths, so each row shows both points on one 0–100
 * scale instead: where the raw files land, and where the store lands. A tie
 * renders as concentric dots, which is the honest picture of a tie.
 */
export function DotPlot({ title, axis, unit, rows }: DotPlotProps) {
  return (
    <figure className="lr-figure">
      <Caption title={title} axis={axis} />

      <table className="lr-chart">
        <caption className="sr-only">
          {title}, measured in {unit}
        </caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="lr-chart-label">
                {row.label}
              </th>
              <td className="lr-chart-cell">
                <span className="lr-track lr-dot-track" aria-hidden="true">
                  <span
                    className="lr-dot-span"
                    style={{
                      left: `${Math.min(row.base, row.store)}%`,
                      width: `${Math.abs(row.store - row.base)}%`,
                    }}
                  />
                  <span className="lr-dot" style={{ left: `${row.base}%` }} />
                  <span className="lr-dot lr-dot-accent" style={{ left: `${row.store}%` }} />
                </span>
              </td>
              <td className="lr-chart-value">{row.display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function Legend({ items }: { items: { label: string; accent?: boolean }[] }) {
  return (
    <ul className="lr-legend">
      {items.map((item) => (
        <li key={item.label}>
          <span
            aria-hidden="true"
            className={item.accent ? 'lr-swatch lr-swatch-accent' : 'lr-swatch'}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
