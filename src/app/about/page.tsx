export const metadata = {
  title: 'About | Portfolio',
  description:
    'A software developer working across Windows system programming, native desktop apps, and full-stack web.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-20">
      <h1 className="text-3xl font-bold text-primary mb-8">About Me</h1>

      <div className="space-y-6 text-secondary leading-relaxed">
        <p className="text-lg text-primary">
          I&apos;m a developer who learned by building. This site is proof of that:
          a full-stack application I designed, architected, and shipped myself,
          alongside a set of Windows tools I wrote to solve my own problems.
        </p>

        <p>
          My work sits in three places. I build Windows desktop tools in C#, where the
          interesting problems are the ones the operating system does not document well:
          window state, process suspension, input hooks, and registry-backed configuration.
          I build web applications end to end, front-end through database. And I have
          written at least one Android app, where the constraints are different again:
          permissions, services that the OS wants to kill, and accessibility APIs.
        </p>
        <p>
          What ties it together is not the platform. It is that I pick problems I actually
          have, work out what the platform is really doing underneath, and build something
          that behaves correctly under the cases nobody documented.
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-3">What I Can Do</h2>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          {[
            { title: 'C# / .NET', desc: 'WinForms, WinUI 3, Windows App SDK, tray apps, system utilities' },
            { title: 'Windows API', desc: 'Win32 interop, window management, process control, input hooks' },
            { title: 'Next.js / React', desc: 'App Router, server and client components, TypeScript end to end' },
            { title: 'Databases & APIs', desc: 'SQLite, REST endpoints, CRUD, authentication' },
            { title: 'Java / Android', desc: 'Accessibility services, foreground services, system APIs' },
            { title: 'Git', desc: 'Version control, branching, merge workflows' },
          ].map(skill => (
            <div key={skill.title} className="p-4 rounded-xl border border-border bg-surface">
              <h3 className="text-primary text-sm font-semibold mb-1">{skill.title}</h3>
              <p className="text-secondary text-sm">{skill.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-3">How I Built It</h2>
        <p>
          AI helped me write code faster, but speed isn&apos;t the point. Every architectural
          decision here is mine: the data model, the auth flow, the API design, and how the
          pages fit together. I reviewed what AI produced, broke it, and fixed it.
        </p>
        <p>
          That&apos;s the real skill on display: knowing what to build, and being able to tell
          whether the code in front of you is right.
        </p>

        <h2 className="text-xl font-semibold text-primary mt-10 mb-3">Why These Projects?</h2>
        <p>
          When job applications ask &quot;have you built something you can explain?&quot; I wanted a
          real answer. Not a tutorial project, not a template.
        </p>
        <p>
          The Windows tools came first. I had a laptop and a set of annoyances: games that
          kept running at full CPU when I alt-tabbed away, windows that would not stay
          maximized, no way to cap volume on a TV box. Each one became a real program that
          I still use.
        </p>
        <p>
          The portfolio site came after, to answer the web side of the same question. It has
          a front-end, a back-end, a database, authentication, CRUD, a contact form, and a
          blog. It&apos;s a real full-stack application.
        </p>
      </div>
    </div>
  );
}
