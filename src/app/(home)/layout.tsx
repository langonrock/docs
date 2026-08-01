import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { IBM_Plex_Mono } from 'next/font/google';
import { baseOptions } from '@/lib/layout.shared';

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono-display',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout {...baseOptions()}>
      <div className={plexMono.variable}>{children}</div>
    </HomeLayout>
  );
}
