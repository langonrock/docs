import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { appName, siteDescription } from '@/lib/shared';

export const alt = `${appName} — a token-efficient store for OKF knowledge bundles`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const COBALT = '#004c9b';
const DIM = '#adc7e4';

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: COBALT,
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <img src={logoSrc} width={120} height={120} alt="" />
          <span style={{ fontSize: 40, color: '#ffffff', fontWeight: 600 }}>{appName}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <span style={{ fontSize: 60, color: '#ffffff', lineHeight: 1.15, letterSpacing: -1.5 }}>
            Your Markdown stays the source of truth. Your agent reads the compiled manifest.
          </span>
          <span style={{ fontSize: 26, color: DIM, lineHeight: 1.4 }}>{siteDescription}</span>
        </div>
      </div>
    ),
    size,
  );
}
