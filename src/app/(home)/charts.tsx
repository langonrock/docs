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

export interface ChangeRow {
  label: string;
  /** Signed percentage against the baseline: negative is less of it, positive is more. */
  value: number;
  display: string;
}

interface ChangeChartProps {
  title: string;
  axis: string;
  unit: string;
  rows: ChangeRow[];
  max: number;
}

/**
 * Change against a baseline that sits on the zero line, so a bar's direction is
 * the finding and its length the size of it. Every bar is the new engine, so
 * every bar carries the accent; colouring the regressions differently would
 * repaint the meaning whenever a number crossed the line.
 */
export function ChangeChart({ title, axis, unit, rows, max }: ChangeChartProps) {
  return (
    <figure className="lr-figure">
      <figcaption className="lr-figcaption">
        <b>{title}</b>
        <span className="lr-mono">{axis}</span>
      </figcaption>

      <table className="lr-chart">
        <caption className="sr-only">
          {title}, measured in {unit}
        </caption>
        <tbody>
          {rows.map((row) => {
            const width = `${Math.max((Math.abs(row.value) / max) * 50, 0.6)}%`;
            return (
              <tr key={row.label}>
                <th scope="row" className="lr-chart-label">
                  {row.label}
                </th>
                <td className="lr-chart-cell">
                  <span className="lr-track lr-change-track" aria-hidden="true">
                    <span
                      className={
                        row.value < 0
                          ? 'lr-change-fill lr-change-less'
                          : 'lr-change-fill lr-change-more'
                      }
                      style={{ width }}
                    />
                  </span>
                </td>
                <td className="lr-chart-value">{row.display}</td>
              </tr>
            );
          })}
          <tr aria-hidden="true">
            <td />
            <td>
              <span className="lr-change-axis">
                <span>less</span>
                <span>0</span>
                <span>more</span>
              </span>
            </td>
            <td />
          </tr>
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
