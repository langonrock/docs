import { ImageResponse } from 'next/og';
import { ogFonts } from '@/lib/og-fonts';
import { ogMark } from '@/lib/og-mark';
import { appName, siteLead, siteTagline } from '@/lib/shared';
import { dump, manifestBytes } from './(home)/manifest';

export const alt = `${appName}, ${siteTagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#090c12';
const PANEL = '#171c24';
const RULE = '#363e49';
const INK = '#f0f2f4';
const DIM = '#a9aeb7';
const FAINT = '#7b828c';
const COBALT = '#5497fb';
const COBALT_GLOW = 'rgba(84, 151, 251, 0.45)';
const ON_COBALT = '#060d1a';

/**
 * Satori has no monospace font loaded, so the byte grid is laid out with fixed
 * width boxes rather than trusting the glyph advance. The bytes are the real
 * compiled manifest, the same ones the page renders.
 *
 * It also refuses a text node and a styled span as siblings, so the headline
 * cannot flow the way the hero's does. Its two lines are split by hand, and the
 * pixel words carry their own leading space as a margin.
 */
export default async function OpenGraphImage() {
  const preview = dump(manifestBytes, 48);
  const [mark, fonts] = await Promise.all([ogMark(), ogFonts()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={mark} width={50} height={70} alt="" />
          <span style={{ fontSize: 30, color: INK, fontWeight: 600 }}>{appName}</span>
          <span style={{ fontSize: 30, color: FAINT }}>/</span>
          <span style={{ fontSize: 26, color: DIM }}>langonrock</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 54,
              fontWeight: 500,
              color: INK,
              lineHeight: 1.12,
              letterSpacing: -1.7,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span>{appName} is a</span>
              <span
                style={{
                  marginLeft: 16,
                  fontFamily: 'Geist Pixel',
                  fontSize: 51,
                  color: COBALT,
                  letterSpacing: 0.5,
                  textShadow: `0 0 24px ${COBALT_GLOW}`,
                }}
              >
                faster, cheaper
              </span>
            </div>
            <span>document database for AI agents.</span>
          </div>
          <span style={{ fontSize: 21, color: DIM, lineHeight: 1.5 }}>{siteLead}</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: PANEL,
            border: `1px solid ${RULE}`,
            borderRadius: 6,
            padding: '18px 22px',
          }}
        >
          {preview.map((row) => (
            <div key={row.offset} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ fontSize: 20, color: FAINT, width: 108 }}>{row.offset}</span>
              {row.bytes.map((byte, column) => (
                <span
                  key={column}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 30,
                    fontSize: 20,
                    borderRadius: 2,
                    color: byte?.cls === 'text' ? DIM : ON_COBALT,
                    background: byte && byte.cls !== 'text' ? COBALT : 'transparent',
                  }}
                >
                  {byte ? byte.hex : ''}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
