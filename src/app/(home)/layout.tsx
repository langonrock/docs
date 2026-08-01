import { HomeLayout } from 'fumadocs-ui/layouts/home';
import Link from 'next/link';
import { baseOptions } from '@/lib/layout.shared';
import { docsRoute } from '@/lib/shared';

/*
 * The header renders its link slots either left of the title or right of the search
 * trigger, so the docs link is passed as `nav.children` and pushed over with an auto
 * margin, which lands it before the search rather than after it.
 */
const base = baseOptions();

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...base}
      nav={{
        ...base.nav,
        children: (
          <Link
            href={docsRoute}
            className="ms-auto p-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground"
          >
            Docs
          </Link>
        ),
      }}
    >
      {children}
    </HomeLayout>
  );
}
