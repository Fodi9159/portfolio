import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock next/navigation and next/link
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) =>
    <a href={href} className={className}>{children}</a>,
}));

describe('HomePage', () => {
  it('renders the hero heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /I build things.*for the.*web/i })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<HomePage />);
    expect(screen.getByText(/A portfolio built from scratch/)).toBeInTheDocument();
  });

  it('renders View Projects link', () => {
    render(<HomePage />);
    expect(screen.getByText('View Projects')).toBeInTheDocument();
  });

  it('renders Contact Me link', () => {
    render(<HomePage />);
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('renders skill cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Database')).toBeInTheDocument();
  });
});
