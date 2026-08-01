import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Public_Sans, Spline_Sans_Mono } from 'next/font/google';
import { baseOptions } from '@/lib/layout.shared';

const sans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-brand-sans',
});

const mono = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-brand-mono',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout {...baseOptions()}>
      <div className={`${sans.variable} ${mono.variable}`}>{children}</div>
    </HomeLayout>
  );
}
