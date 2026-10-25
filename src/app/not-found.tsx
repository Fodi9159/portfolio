import Link from 'next/link';

export const metadata = { title: '404 | Page Not Found' };

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-secondary text-lg mb-8">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all"
      >
        Go Home
      </Link>
    </div>
  );
}
