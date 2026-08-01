import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { appName, siteDescription, siteTagline, siteUrl } from '@/lib/shared';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName} — ${siteTagline}`,
    template: `%s — ${appName}`,
  },
  description: siteDescription,
  applicationName: appName,
  keywords: [
    'document database',
    'Open Knowledge Format',
    'OKF',
    'MCP server',
    'AI agents',
    'prompt caching',
    'knowledge base',
    'BM25',
  ],
  openGraph: {
    type: 'website',
    siteName: appName,
    url: siteUrl,
    locale: 'en_US',
    title: `${appName} — ${siteTagline}`,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{ defaultTheme: 'dark', forcedTheme: 'dark', enableSystem: false, hotKey: false }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
