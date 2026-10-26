import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getDB, type Post } from '@/lib/db';

// Reads from Postgres at request time, so it is never prerendered.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const db = await getDB();
  const rows = await db<Pick<Post, 'title' | 'excerpt'>[]>`
    SELECT title, excerpt FROM posts WHERE slug = ${slug} AND published = ${true}
  `;
  const post = rows[0];
  if (post) {
    return { title: `${post.title} | Mufeed Batis`, description: post.excerpt || post.title };
  }
  return { title: 'Post | Mufeed Batis' };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const db = await getDB();
  const rows = await db<Post[]>`SELECT * FROM posts WHERE slug = ${slug} AND published = ${true}`;
  const post = rows[0];

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Post not found</h1>
        <Link href="/blog" className="text-accent hover:underline text-sm">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-20">
      <Link href="/blog" className="text-accent text-sm hover:underline mb-8 inline-block">
        ← Back to blog
      </Link>
      <h1 className="text-3xl font-bold text-primary mb-3">{post.title}</h1>
      <p className="text-muted text-sm mb-8">
        {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
