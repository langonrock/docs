import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { appName, siteDescription, siteUrl } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName} — a token-efficient store for OKF knowledge bundles`,
    template: `%s — ${appName}`,
  },
  description: siteDescription,
  applicationName: appName,
  keywords: [
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
    title: `${appName} — a token-efficient store for OKF knowledge bundles`,
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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
