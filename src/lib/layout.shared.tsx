import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { GithubStars } from '@/components/github-stars';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt=""
            width={711}
            height={1024}
            className="lr-nav-mark h-9 w-auto"
            unoptimized
            priority
          />
          <span className="font-medium">{appName}</span>
        </span>
      ),
    },
    themeSwitch: { enabled: false },
    links: [{ type: 'custom', secondary: true, children: <GithubStars /> }],
  };
}
