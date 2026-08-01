import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    ...source.getPages().map((page) => ({
      url: new URL(page.url, siteUrl).toString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
