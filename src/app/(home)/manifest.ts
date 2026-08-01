import { createHash } from 'node:crypto';

export const columns = ['id', 'bundle', 'kind', 'status', 'grain', 'summary', 'links'] as const;

/**
 * A deliberate mix of kinds. A concept is any document with frontmatter, and a
 * manifest of nothing but warehouse tables misrepresents what people put in a
 * bundle. Ordered by bundle then id, matching what the compiler emits.
 */
export const rows = [
  [
    'checkout',
    'api',
    'openapi_service',
    '-',
    '-',
    'Public checkout endpoints and their error codes.',
    'orders',
  ],
  ['adr_0007', 'arch', 'decision', '-', '-', 'Why the store is not in Postgres.', '-'],
  ['rollback', 'ops', 'runbook', 'draft', '-', 'Backing out a bad orders release.', 'checkout'],
  [
    'orders',
    'sales',
    'bigquery_table',
    '-',
    'order_id',
    'One row per completed customer order.',
    'checkout',
  ],
] as const;

/**
 * The single source both views render from. The table below the hero and the hex
 * dump beside it are the same bytes, so the page's byte-determinism claim is
 * checkable against the page itself rather than asserted.
 */
export const manifestText = `${rows.map((row) => row.join('\t')).join('\n')}\n`;

export const manifestBytes = new TextEncoder().encode(manifestText);

export const digest = createHash('sha256').update(manifestBytes).digest('hex');

export type ByteClass = 'field' | 'record' | 'text';

export interface DumpByte {
  hex: string;
  glyph: string;
  cls: ByteClass;
}

export interface DumpRow {
  offset: string;
  bytes: (DumpByte | null)[];
}

/**
 * Tabs and newlines are what turn a blob into a manifest, so they carry the
 * accent and everything else stays ink. The structure of the record is legible
 * in the dump without a caption explaining it.
 */
function classify(byte: number): ByteClass {
  if (byte === 0x09) return 'field';
  if (byte === 0x0a) return 'record';
  return 'text';
}

const WIDTH = 16;

export function dump(bytes: Uint8Array, limit: number): DumpRow[] {
  const shown = bytes.subarray(0, limit);
  const result: DumpRow[] = [];

  for (let start = 0; start < shown.length; start += WIDTH) {
    const slice = Array.from(shown.subarray(start, start + WIDTH));
    result.push({
      offset: start.toString(16).padStart(8, '0'),
      bytes: Array.from({ length: WIDTH }, (_, index) => {
        const byte = slice[index];
        if (byte === undefined) return null;
        const printable = byte >= 0x20 && byte < 0x7f;
        return {
          hex: byte.toString(16).padStart(2, '0'),
          glyph: printable ? String.fromCharCode(byte) : '.',
          cls: classify(byte),
        };
      }),
    });
  }

  return result;
}
