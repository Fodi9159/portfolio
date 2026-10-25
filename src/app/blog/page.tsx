import Link from 'next/link';
import { getDB } from '@/lib/db';

export const metadata = { title: 'Blog | Portfolio', description: 'Thoughts, notes, and things I have learned building software.' };

export default async function BlogPage() {
  const db = getDB();
  const posts = db.prepare('SELECT id, title, slug, excerpt, created_at FROM posts WHERE published = 1 ORDER BY created_at DESC').all();

  return (
    <div className="max-w-3xl mx-auto py-20">
      <h1 className="text-3xl font-bold text-primary mb-2">Blog</h1>
      <p className="text-secondary mb-10">Thoughts, notes, and things I&apos;ve learned.</p>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p>No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block p-6 rounded-xl border border-border bg-surface hover:shadow-border transition-all"
            >
              <h2 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-secondary text-sm mt-2 leading-relaxed">
                {post.excerpt}
              </p>
              <p className="text-muted text-xs mt-3">
                {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
