export interface Row {
  label: string;
  value: number;
  display: string;
  /** The langonrock path. Carries the accent; everything else is context. */
  accent?: boolean;
}

interface BarChartProps {
  title: string;
  rows: Row[];
  max: number;
  axis: string;
  unit: string;
}

/**
 * The bars live inside a real table, so the chart and its table view are the
 * same DOM. A screen reader reads labels and values; nobody needs a separate
 * accessible twin that can drift out of sync with the numbers beside it.
 */
export function BarChart({ title, rows, max, axis, unit }: BarChartProps) {
  return (
    <figure className="lr-figure">
      <figcaption className="lr-figcaption">
        <span className="font-medium text-fd-foreground">{title}</span>
        <span className="lr-mono text-fd-muted-foreground"> 0 – {axis}</span>
      </figcaption>

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
              <td className="lr-chart-value lr-mono">{row.display}</td>
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
      <figcaption className="lr-figcaption">
        <span className="font-medium text-fd-foreground">{title}</span>
        <span className="lr-mono text-fd-muted-foreground"> 0 – {axis}</span>
      </figcaption>

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
                <td className="lr-chart-value lr-mono">{row.display}</td>
              </tr>
            )),
          )}
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
