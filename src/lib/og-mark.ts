import { readFile } from 'node:fs/promises';

/*
 * Satori has no `filter` support, so the mark's white contour cannot be drawn
 * the way the nav draws it. It is baked into this bitmap instead, and inlined
 * as a data URI because the card is rendered without a request origin to
 * resolve a path against.
 */
export async function ogMark(): Promise<string> {
  const data = await readFile(new URL('./mark.png', import.meta.url));

  return `data:image/png;base64,${data.toString('base64')}`;
}
