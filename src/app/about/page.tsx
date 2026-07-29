export const metadata = { title: 'About — Portfolio', description: 'Full-stack developer — building things for the web.' };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-20">
      <h1 className="text-3xl font-bold text-primary mb-8">About Me</h1>

      <div className="space-y-6 text-secondary leading-relaxed">
        <p className="text-lg text-primary">
          I&apos;m a developer who learned by building. This site is proof of that —
          every line of code, from the pixel on screen to the database in the back, was written by me.
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-3">What I Can Do</h2>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          {[
            { title: 'HTML & CSS', desc: 'Responsive layouts, animations, clean design' },
            { title: 'JavaScript / React', desc: 'Interactive UIs, components, state management' },
            { title: 'Next.js', desc: 'Full-stack React — pages, APIs, deployment' },
            { title: 'Databases & APIs', desc: 'SQLite, REST endpoints, CRUD, auth' },
            { title: 'Git & Deployment', desc: 'Version control, hosting on Vercel' },
            { title: 'Problem Solving', desc: 'Breaking problems down, debugging, learning fast' },
          ].map(skill => (
            <div key={skill.title} className="p-4 rounded-xl border border-border bg-surface">
              <h3 className="text-primary text-sm font-semibold mb-1">{skill.title}</h3>
              <p className="text-secondary text-sm">{skill.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-3">Why This Site?</h2>
        <p>
          When job applications ask &quot;have you ever built a website?&quot; — I wanted a real answer.
          Not a tutorial project, not a template. Something I built from nothing, that I can explain
          piece by piece.
        </p>
        <p>
          It has a front-end (what you see), a back-end (what powers it), and a database (what stores it).
          It has user authentication, CRUD operations, a contact form, and a blog.
          It&apos;s a real full-stack application.
        </p>
      </div>
    </div>
  );
}
