import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

vi.mock('next/navigation', () => ({
  usePathname: () => '/nonexistent',
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>,
}));

describe('NotFound Page', () => {
  it('renders 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the not-found message', () => {
    render(<NotFound />);
    expect(screen.getByText("This page doesn't exist.")).toBeInTheDocument();
  });

  it('renders Go Home link', () => {
    render(<NotFound />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });
});
