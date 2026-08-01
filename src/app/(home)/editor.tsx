import Link from 'next/link';
import { ArrowLeftRight, FolderTree, Network, SquarePen } from 'lucide-react';

const editorRepo = 'https://github.com/langonrock/editor';

const surfaces = [
  {
    icon: FolderTree,
    title: 'The bundle tree',
    body: 'Every bundle and concept in the tenant, as they sit on disk.',
  },
  {
    icon: SquarePen,
    title: 'Markdown, with a form for the frontmatter',
    body: 'Prose stays prose. The fields that have to validate get fields.',
  },
  {
    icon: Network,
    title: 'The link graph',
    body: 'What a concept points at, and what points back at it.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Archives and spreadsheets',
    body: 'Move a bundle in or out without touching the store by hand.',
  },
];

export function Editor() {
  return (
    <section className="lr-band">
      <div className="lr-container py-24">
        <div className="lr-head">
          <h2 className="lr-h2">People get an editor, not a manifest</h2>
          <div>
            <p className="lr-prose">
              The compiled read model is for agents. langoneditor is the half you look at, a desktop
              app for macOS, Windows and Linux. Point it at a folder of Markdown and it works, or
              point it at a langonrock server and it searches that server’s own index. The binary
              ships inside it, so there is nothing else to install.
            </p>
            <p className="lr-prose mt-4">
              It derives no ids, resolves no links and reproduces no lint rules. It writes the source
              Markdown and lets the watcher recompile, so the editor and the store cannot drift
              apart.
            </p>
            <div className="lr-actions mt-7">
              <a href={editorRepo} className="lr-action-quiet">
                Get langoneditor
              </a>
              <Link href="/docs/guides/editing" className="lr-link lr-mono text-sm">
                How editing works
              </Link>
            </div>
          </div>
        </div>

        <ul className="lr-surfaces mt-12">
          {surfaces.map((surface) => {
            const Icon = surface.icon;
            return (
              <li key={surface.title} className="lr-surface">
                <Icon className="lr-surface-icon" size={18} strokeWidth={1.5} aria-hidden="true" />
                <h3 className="lr-surface-title">{surface.title}</h3>
                <p className="lr-surface-body">{surface.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
