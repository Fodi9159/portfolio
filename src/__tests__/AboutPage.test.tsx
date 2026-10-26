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
    expect(screen.getByText('C# / .NET')).toBeInTheDocument();
    expect(screen.getByText('Windows API')).toBeInTheDocument();
    expect(screen.getByText('Next.js / React')).toBeInTheDocument();
    expect(screen.getByText('Databases & APIs')).toBeInTheDocument();
    expect(screen.getByText('Java / Android')).toBeInTheDocument();
    expect(screen.getByText('Git & Testing')).toBeInTheDocument();
  });

  it('mentions the full-stack application', () => {
    render(<AboutPage />);
    expect(screen.getAllByText(/full-stack application/).length).toBeGreaterThanOrEqual(1);
  });

  it('explains how the site was built with AI', () => {
    render(<AboutPage />);
    expect(screen.getByText('How I Built It')).toBeInTheDocument();
    expect(screen.getByText(/reviewed what AI produced/)).toBeInTheDocument();
  });

  it('explains where the projects came from', () => {
    render(<AboutPage />);
    expect(screen.getByText('Why These Projects?')).toBeInTheDocument();
  });
});
