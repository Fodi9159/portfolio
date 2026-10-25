import Link from 'next/link';

const features = [
  {
    title: 'Full-stack Next.js',
    desc: 'App Router with Server Components for pages and Client Components for interactivity, in TypeScript end to end.',
  },
  {
    title: 'SQLite database',
    desc: 'better-sqlite3 with WAL mode, plus a hand-written schema for posts, contacts, and the admin user.',
  },
  {
    title: 'Authentication',
    desc: 'JWT login, bcrypt-hashed passwords, HttpOnly cookie session, and a protected admin dashboard.',
  },
  {
    title: 'REST API routes',
    desc: 'Posts CRUD, contact form submission, and session endpoints, each reading and writing the database.',
  },
  {
    title: 'Markdown blog',
    desc: 'Posts stored in SQLite, rendered with react-markdown, served at clean slug-based URLs.',
  },
  {
    title: 'Test suite',
    desc: 'Vitest and Testing Library tests covering the pages and components that matter.',
  },
];

const stack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SQLite', 'JWT', 'Vitest'];

export const metadata = {
  title: 'Projects | Portfolio',
  description: 'A full-stack portfolio site: front-end, back-end, database, and authentication.',
};

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1 className="text-3xl font-bold text-primary mb-2">Projects</h1>
      <p className="text-secondary mb-10">Things I&apos;ve built.</p>

      <div className="space-y-5">
        <div className="p-6 sm:p-8 rounded-xl border border-border bg-surface">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-primary">Portfolio &amp; Blog Platform</h2>
              <p className="text-muted text-sm mt-1">
                The site you are looking at. Designed and built from scratch, front to back.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-secondary hover:text-primary transition-colors"
              >
                About this build
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
              >
                Try the blog
              </Link>
            </div>
          </div>

          <p className="text-secondary text-sm mt-4 leading-relaxed max-w-2xl">
            A full-stack application with a real front-end, a real back-end, and a real database.
            It has public pages, a markdown blog, a contact form that persists submissions, and a
            password-protected admin area for writing and editing posts. Every architectural
            decision, the data model, the auth flow, the API design, and the page structure, is mine.
          </p>

          <h3 className="text-primary text-sm font-semibold mt-8 mb-4">What it does</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(feature => (
              <div key={feature.title} className="p-4 rounded-lg border border-border bg-card">
                <h4 className="text-primary text-sm font-semibold mb-1">{feature.title}</h4>
                <p className="text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-primary text-sm font-semibold mt-8 mb-4">Stack</h3>
          <div className="flex flex-wrap gap-2">
            {stack.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-border/30 text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
