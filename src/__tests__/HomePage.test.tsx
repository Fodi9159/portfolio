import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

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
    expect(screen.getByRole('heading', { name: /I build things.*that.*work/i })).toBeInTheDocument();
  });

  it('presents the role as software developer, not web-only', () => {
    render(<HomePage />);
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<HomePage />);
    expect(screen.getByText(/Designed,\s*architected, and shipped/)).toBeInTheDocument();
  });

  it('discloses AI assistance honestly', () => {
    render(<HomePage />);
    expect(screen.getByText(/with AI as my pair-programmer/)).toBeInTheDocument();
  });

  it('renders View Projects link', () => {
    render(<HomePage />);
    expect(screen.getByText('View Projects')).toBeInTheDocument();
  });

  it('renders Contact Me link', () => {
    render(<HomePage />);
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('covers all three platforms', () => {
    render(<HomePage />);
    expect(screen.getByText('Windows & Desktop')).toBeInTheDocument();
    expect(screen.getByText('Web')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });
});
