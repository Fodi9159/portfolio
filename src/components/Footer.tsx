'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const path = usePathname();
  if (path.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Portfolio. Built with Next.js. AI-assisted, human-reviewed.</p>
        <p>
          <a href="/admin/login" className="hover:text-primary transition-colors">Admin</a>
        </p>
      </div>
    </footer>
  );
}
