'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (path.startsWith('/admin')) return null;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-canvas/80 backdrop-blur-lg">
      <div className="max-w-4xl mx-auto h-16 flex items-center justify-between px-6 md:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight text-primary">
          Portfolio<span className="text-accent">.</span>
        </Link>

        <button
          className="md:hidden text-secondary hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                path === l.href
                  ? 'text-accent font-medium'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-canvas/95 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto px-6 md:px-10 py-4 flex flex-col gap-4">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm transition-colors ${
                  path === l.href
                    ? 'text-accent font-medium'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
