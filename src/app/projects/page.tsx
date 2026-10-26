import Link from 'next/link';

type Feature = {
  title: string;
  desc: string;
};

type Project = {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  repo?: string;
  /** For forks and local-only work, where the honest summary of the work lives. */
  note?: string;
  /** Overrides the badge shown when a project has no public repository. */
  localLabel?: string;
  features?: Feature[];
};

const portfolioFeatures: Feature[] = [
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
    desc: 'Posts CRUD, contact submission, and session endpoints, each reading and writing the database.',
  },
  {
    title: 'Markdown blog',
    desc: 'Posts stored in SQLite, rendered with react-markdown, served at clean slug-based URLs.',
  },
];

const featured: Project[] = [
  {
    title: 'Process Suspender',
    tagline: 'A game freezes when you alt-tab away, and resumes the instant you come back',
    description:
      'A Windows tray app that suspends a target process the moment it loses focus, and restores it on return. The hard part is not the suspending: it is that a suspended process can never receive window activation, so Windows silently refuses to give it focus when you alt-tab back. The app therefore watches keyboard and mouse through low-level hooks on a dedicated thread, resolves where the shell actually landed after a switch, and handles the taskbar-button and direct-click paths too.',
    features: [
      {
        title: 'Two freeze modes',
        desc: 'NtSuspendProcess for a true zero, or IDLE priority, EcoQoS and a Job Object CPU cap for games that would otherwise detect or reject suspension.',
      },
      {
        title: 'Low-level input hooks',
        desc: 'A suspended process cannot be activated by Windows, so the app resolves focus itself from keyboard and mouse events on a dedicated thread.',
      },
      {
        title: 'Never-suspend whitelist',
        desc: 'Critical Windows, GPU driver and anti-cheat processes are refused at every entry point, and resumed immediately if they were already frozen.',
      },
      {
        title: 'Global hotkeys',
        desc: 'Lock onto the focused window and toggle the app from inside a fullscreen game, both remappable by pressing the new combination.',
      },
    ],
    stack: ['C#', '.NET Framework', 'Win32 API', 'Low-level input hooks', 'Job Objects'],
    repo: 'https://github.com/Fodi9159/ProcessSuspender',
  },
  {
    title: 'WindowMaximizer',
    tagline: 'Remembers whether each window was closed maximized, and re-maximizes it on reopen',
    description:
      'A Windows tray app that tracks window state per window rather than per app, so two Explorer folders keep separate state. Detection is event-driven through SetWinEventHook, with a polling fallback so events dropped under load cannot stick.',
    features: [
      {
        title: 'Event-driven, with a safety net',
        desc: 'SetWinEventHook wakes the watcher the moment a window is created, shown, hidden or destroyed, so restores react in milliseconds; a poll covers dropped events.',
      },
      {
        title: 'Hung windows cannot block it',
        desc: 'Window text is read with SendMessageTimeout rather than GetWindowText, which would block forever on a hung window anywhere on the system.',
      },
      {
        title: 'Per-instance window state',
        desc: 'Two windows that share a title get separate slots, so closing one maximized does not make its sibling reopen maximized.',
      },
      {
        title: 'Display changes',
        desc: 'A WM_DISPLAYCHANGE filter re-maximizes windows that Windows shrank after a resolution change or a monitor plug and unplug.',
      },
    ],
    stack: ['C#', '.NET 10', 'Win32 API', 'SetWinEventHook', 'Registry'],
    repo: 'https://github.com/Fodi9159/WindowMaximizer',
  },
];

const other: Project[] = [
  {
    title: 'FsoTuner',
    tagline: 'A native Windows 11 app for controlling Fullscreen Optimizations',
    description:
      'Reads and writes the five Fullscreen Optimizations values under HKCU, applies four global presets, and manages per-game overrides through the AppCompat layers key using the same flag as the Compatibility tab. A real native app, not a web wrapper.',
    stack: ['C#', 'WinUI 3', 'Windows App SDK', 'Registry'],
    repo: 'https://github.com/Fodi9159/FsoTuner',
  },
  {
    title: 'Volume Limiter',
    tagline: 'Caps the maximum volume on Android TV boxes, which offer no native limit',
    description:
      'An accessibility service intercepts volume-up before the system sees it, while a foreground service polls every audio stream and reacts to volume-change broadcasts, so volume raised by a remote, a cast session or another app gets clamped too.',
    stack: ['Java', 'Android', 'Accessibility Service', 'Foreground Service'],
    repo: 'https://github.com/Fodi9159/VolumeLimiter',
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-6 sm:p-8 rounded-xl border border-border bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-primary">{project.title}</h2>
          <p className="text-muted text-sm mt-1">{project.tagline}</p>
        </div>
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            Source code
          </a>
        ) : (
          <span className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted">
            {project.localLabel ?? 'Local only'}
          </span>
        )}
      </div>

      <p className="text-secondary text-sm mt-4 leading-relaxed max-w-2xl">
        {project.description}
      </p>

      {project.note && (
        <p className="text-muted text-xs mt-3 leading-relaxed max-w-2xl">{project.note}</p>
      )}

      {project.features && (
        <>
          <h3 className="text-primary text-sm font-semibold mt-8 mb-4">How it works</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.features.map(feature => (
              <div key={feature.title} className="p-4 rounded-lg border border-border bg-card">
                <h4 className="text-primary text-sm font-semibold mb-1">{feature.title}</h4>
                <p className="text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className="text-primary text-sm font-semibold mt-8 mb-3">Stack</h3>
      <div className="flex flex-wrap gap-2">
        {project.stack.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-border/30 text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Projects | Portfolio',
  description:
    'Windows system tools, native desktop apps, and a full-stack web application: things I have built and can explain piece by piece.',
};

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1 className="text-3xl font-bold text-primary mb-2">Projects</h1>
      <p className="text-secondary mb-10">Things I&apos;ve built, and can explain piece by piece.</p>

      <div className="space-y-5">
        <ProjectCard
          project={{
            title: 'Portfolio & Blog Platform',
            tagline: 'The site you are looking at. Designed and built from scratch, front to back.',
            description:
              'A full-stack application with a real front-end, a real back-end, and a real database. It has public pages, a markdown blog, a contact form that persists submissions, and a password-protected admin area for writing and editing posts. Every architectural decision, the data model, the auth flow, the API design, and the page structure, is mine.',
            features: portfolioFeatures,
            stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SQLite', 'JWT'],
            localLabel: 'This site',
          }}
        />

        {featured.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <h2 className="text-lg font-semibold text-primary mt-14 mb-5">Smaller tools</h2>
      <div className="space-y-5">
        {other.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <h2 className="text-lg font-semibold text-primary mt-14 mb-5">Open-source contributions</h2>
      <ProjectCard
        project={{
          title: 'G-Helper',
          tagline: 'A fork of seerge/g-helper, the ASUS laptop control utility',
          description:
            'I did not write g-helper, and I am not claiming I did. It is a large existing open-source project and this is my fork of it. My contribution is a set of features on top: a core voltage control using NVAPI boost lock, a separate core clock limit, per-performance-mode power limits, click-to-type slider values, F-row key bindings, and fixes to the fan sensor readings and keyboard backlight.',
          stack: ['C#', 'WinForms', 'NVAPI', 'ASUS ACPI'],
          repo: 'https://github.com/Fodi9159/g-helper',
          note: 'Forked from seerge/g-helper. The upstream project is not mine; the additions listed above are.',
        }}
      />

      <div className="mt-14 p-6 rounded-xl border border-border bg-card">
        <h3 className="text-primary text-sm font-semibold mb-2">A note on how these were built</h3>
        <p className="text-secondary text-sm leading-relaxed">
          I used AI as a pair-programmer throughout: for boilerplate, explanations, and debugging
          help. The architectural decisions are mine. The data model, the auth flow, the API design,
          the page structure, and the hard problems in the tools above, were chosen by me. I reviewed
          what AI produced, broke it, and fixed it. Disclosing this because it is the accurate
          description of how the work was done.
        </p>
        <Link
          href="/about"
          className="inline-block mt-4 text-sm font-medium text-accent hover:underline"
        >
          More on my approach
        </Link>
      </div>
    </div>
  );
}
