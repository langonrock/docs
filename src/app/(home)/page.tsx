import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { appName, siteDescription, siteLead, siteTagline } from '@/lib/shared';
import { DarkGradientBg } from '@/components/ui/elegant-dark-pattern';
import { Benchmarks } from './benchmarks';
import { Cost } from './cost';
import { Editor } from './editor';
import { Features } from './features';
import { GetStarted } from './get-started';
import { Install } from './install';
import { ReadPath } from './read-path';
import { SiteFooter } from './site-footer';
import { Strategies } from './strategies';
import './home.css';

export const metadata: Metadata = {
  title: {
    absolute: `${appName}, ${siteTagline}`,
  },
  description: siteDescription,
  alternates: { canonical: '/' },
};

/**
 * Declared against the single face rather than imported from `geist/font/pixel`,
 * which registers all five pixel styles and makes the build preload every one of
 * them on a page that uses two words of one.
 */
const pixel = localFont({
  src: '../../../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2',
  weight: '500',
  fallback: ['ui-monospace', 'monospace'],
  adjustFontFallback: false,
});

export default function HomePage() {
  return (
    <main className="lr">
      <DarkGradientBg>
        <section className="lr-container pt-16 pb-20 sm:pt-24 sm:pb-24">
          <div className="lr-hero">
            <div>
              <h1 className="lr-display">
                {appName} is a{' '}
                <span className={`lr-pixel ${pixel.className}`}>faster, cheaper</span> document
                database for AI agents.
              </h1>

              <p className="lr-prose lr-lead mt-7">{siteLead}</p>

              <div className="mt-12">
                <Install />
              </div>
            </div>

            <Benchmarks />
          </div>
        </section>
      </DarkGradientBg>

      <Features />

      <ReadPath />

      <Strategies />

      <Cost />

      <Editor />

      <GetStarted />

      <SiteFooter />
    </main>
  );
}
