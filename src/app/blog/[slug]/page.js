import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

async function getPost(slug) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/posts?slug=${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${base}/api/posts?slug=${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const post = await res.json();
      return { title: `${post.title} — Portfolio`, description: post.excerpt || post.title };
    }
  } catch {}
  return { title: 'Post — Portfolio' };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

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
