import { readFile } from 'node:fs/promises';

/*
 * Satori reads ttf and otf, and Geist ships the pixel face as woff2 alone, so
 * these are the site's faces converted and subset to the characters the cards
 * draw. Handing `ImageResponse` any font drops its built-in fallback, so the
 * body weights have to travel alongside the pixel one.
 */
export async function ogFonts() {
  const [regular, medium, pixel] = await Promise.all([
    readFile(new URL('./geist-regular.ttf', import.meta.url)),
    readFile(new URL('./geist-medium.ttf', import.meta.url)),
    readFile(new URL('./geist-pixel-square.ttf', import.meta.url)),
  ]);

  return [
    { name: 'Geist', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Geist', data: medium, weight: 500 as const, style: 'normal' as const },
    { name: 'Geist Pixel', data: pixel, weight: 500 as const, style: 'normal' as const },
  ];
}
