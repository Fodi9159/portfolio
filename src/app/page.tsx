import Link from 'next/link';

export const metadata = { title: 'Portfolio — Full-Stack Developer', description: 'A portfolio built from scratch — front-end, back-end, database, and deployment.' };

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col justify-center">
        <p className="text-accent text-sm font-medium mb-4 tracking-widest uppercase">
          Full-Stack Developer
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-tight">
          I build things
          <br />
          for the <span className="text-accent">web</span>.
        </h1>
        <p className="mt-6 text-lg text-secondary max-w-xl leading-relaxed">
          A portfolio built from scratch — front-end, back-end, database, and deployment.
          Every piece of this site was built by hand.
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all"
          >
            View Projects
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M5 12h14m-4-4 4 4-4 4"/>
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-secondary text-sm font-medium rounded-lg border border-border hover:text-primary hover:border-[var(--border)] transition-all"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* Quick preview */}
      <section className="pb-24">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Frontend', desc: 'React, Next.js, Tailwind CSS — responsive, modern UIs', href: '/about' },
            { title: 'Backend', desc: 'API routes, databases, authentication, server logic', href: '/about' },
            { title: 'Database', desc: 'SQLite, data modeling, CRUD operations', href: '/blog' },
          ].map(card => (
            <Link key={card.title} href={card.href} className="group p-5 rounded-xl border border-border bg-surface hover:shadow-border transition-all">
              <h3 className="text-primary text-sm font-semibold mb-1.5">{card.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
