import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsPage from '@/app/projects/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/projects',
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>,
}));

describe('ProjectsPage', () => {
  it('renders the heading', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
  });

  it('lists the two featured Windows tools', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Process Suspender')).toBeInTheDocument();
    expect(screen.getByText('WindowMaximizer')).toBeInTheDocument();
  });

  it('lists the smaller tools', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('FsoTuner')).toBeInTheDocument();
    expect(screen.getByText('Volume Limiter')).toBeInTheDocument();
  });

  it('lists the portfolio site itself', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Portfolio & Blog Platform')).toBeInTheDocument();
  });

  it('labels g-helper as a contribution, not an original build', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('G-Helper')).toBeInTheDocument();
    expect(screen.getByText('Open-source contributions')).toBeInTheDocument();
    expect(screen.getByText(/I did not write g-helper/)).toBeInTheDocument();
  });

  it('links out to the public repositories', () => {
    render(<ProjectsPage />);
    const links = screen
      .getAllByRole('link')
      .map(anchor => (anchor as HTMLAnchorElement).href)
      .filter(href => href.startsWith('https://github.com/'));

    expect(links).toContain('https://github.com/Fodi9159/ProcessSuspender');
    expect(links).toContain('https://github.com/Fodi9159/WindowMaximizer');
    expect(links).toContain('https://github.com/Fodi9159/FsoTuner');
    expect(links).toContain('https://github.com/Fodi9159/VolumeLimiter');
    expect(links).toContain('https://github.com/Fodi9159/g-helper');
  });

  it('marks external links as opening in a new tab, safely', () => {
    render(<ProjectsPage />);
    const external = screen
      .getAllByRole('link')
      .filter(anchor => (anchor as HTMLAnchorElement).href.startsWith('https://github.com/'));

    external.forEach(anchor => {
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('links to the FsoTuner repository', () => {
    render(<ProjectsPage />);
    const links = screen
      .getAllByRole('link')
      .map(anchor => (anchor as HTMLAnchorElement).href);
    expect(links).toContain('https://github.com/Fodi9159/FsoTuner');
  });

  it('labels the portfolio card as the site itself', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('This site')).toBeInTheDocument();
  });

  it('discloses AI assistance', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('A note on how these were built')).toBeInTheDocument();
    expect(screen.getByText(/AI as a pair-programmer/)).toBeInTheDocument();
  });
});
