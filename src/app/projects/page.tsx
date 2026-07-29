import Link from 'next/link';

const projects = [
  {
    title: 'This Portfolio',
    desc: 'A full-stack portfolio site with a blog, admin panel, contact form, and SQLite database — built from scratch with Next.js.',
    tags: ['Next.js', 'React', 'SQLite', 'Tailwind'],
    href: '/about',
  },
  {
    title: 'Blog Engine',
    desc: 'Custom blog with CRUD operations — create, edit, delete posts through a password-protected admin dashboard.',
    tags: ['API', 'Database', 'Auth'],
    href: '/blog',
  },
  {
    title: 'Contact System',
    desc: 'A contact form that saves submissions to the database, demonstrating form handling, validation, and server-side storage.',
    tags: ['Forms', 'API', 'SQLite'],
    href: '/contact',
  },
];

export const metadata = { title: 'Projects — Portfolio', description: 'Things I have built — full-stack apps, tools, and experiments.' };

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1 className="text-3xl font-bold text-primary mb-2">Projects</h1>
      <p className="text-secondary mb-10">Things I&apos;ve built.</p>

      <div className="grid gap-5">
        {projects.map(p => (
          <Link
            key={p.title}
            href={p.href}
            className="group block p-6 rounded-xl border border-border bg-surface hover:shadow-border transition-all"
          >
            <h2 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
              {p.title}
            </h2>
            <p className="text-secondary text-sm mt-2 leading-relaxed max-w-xl">
              {p.desc}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-md bg-border/30 text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
