import type { CSSProperties } from 'react';
import { dump, type DumpRow } from './manifest';

interface HexDumpProps {
  bytes: Uint8Array;
  limit: number;
  label: string;
}

/**
 * The byte grid is marked decorative because the same bytes are already readable
 * as text in the manifest table, and reading 128 hex pairs aloud is noise rather
 * than information. The figure's caption carries the meaning instead.
 */
export function HexDump({ bytes, limit, label }: HexDumpProps) {
  const rows: DumpRow[] = dump(bytes, limit);
  let index = 0;

  return (
    <figure className="lr-dump" aria-label={label}>
      <div className="lr-dump-scroll">
        {rows.map((row) => (
          <div key={row.offset} className="lr-dump-row">
            <span className="lr-dump-offset" aria-hidden="true">
              {row.offset}
            </span>

            <span className="lr-dump-bytes" aria-hidden="true">
              {row.bytes.map((byte, column) => (
                <span
                  key={column}
                  className={byte ? `lr-b lr-b-${byte.cls}` : 'lr-b lr-b-pad'}
                  style={byte ? ({ '--i': index++ } as CSSProperties) : undefined}
                >
                  {byte ? byte.hex : '  '}
                </span>
              ))}
            </span>

            <span className="lr-dump-ascii" aria-hidden="true">
              {row.bytes.map((byte, column) => (
                <span key={column} className={byte ? `lr-b lr-b-${byte.cls}` : 'lr-b lr-b-pad'}>
                  {byte ? byte.glyph : ' '}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      <figcaption className="lr-dump-caption">
        <ul className="lr-bytekey">
          <li>
            <span className="lr-b lr-b-field">09</span> field
          </li>
          <li>
            <span className="lr-b lr-b-record">0a</span> record
          </li>
          <li>
            <span className="lr-b lr-b-text">63</span> content
          </li>
        </ul>
        <span>
          {bytes.length} bytes total, first {limit} shown
        </span>
      </figcaption>
    </figure>
  );
}
