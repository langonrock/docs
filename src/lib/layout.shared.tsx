import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <span className="font-medium">{appName}</span>,
    },
    themeSwitch: { enabled: false },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
