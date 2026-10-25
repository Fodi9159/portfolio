import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>,
}));

describe('AboutPage', () => {
  it('renders the heading', () => {
    render(<AboutPage />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders skill cards', () => {
    render(<AboutPage />);
    expect(screen.getByText('HTML & CSS')).toBeInTheDocument();
    expect(screen.getByText('JavaScript / React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Databases & APIs')).toBeInTheDocument();
    expect(screen.getByText('Git & Deployment')).toBeInTheDocument();
    expect(screen.getByText('Problem Solving')).toBeInTheDocument();
  });

  it('mentions full-stack in content', () => {
    render(<AboutPage />);
    expect(screen.getAllByText(/full-stack application/).length).toBeGreaterThanOrEqual(2);
  });

  it('explains how the site was built with AI', () => {
    render(<AboutPage />);
    expect(screen.getByText('How I Built It')).toBeInTheDocument();
    expect(screen.getByText(/reviewed what AI produced/)).toBeInTheDocument();
  });
});
