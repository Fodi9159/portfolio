'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

type PostForm = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
};

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [authChecked, setAuthChecked] = useState(false);
  const [form, setForm] = useState<PostForm>({ title: '', slug: '', content: '', excerpt: '', published: true });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push('/admin/login');
        return;
      }
      setAuthChecked(true);
    })();
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;
    (async () => {
      try {
        const res = await fetch('/api/admin/posts');
        if (res.ok) {
          const posts: Array<{ id: number; title: string; slug: string; content: string; excerpt: string; published: boolean }> = await res.json();
          const post = posts.find(p => p.id == Number(id));
          if (post) {
            setForm({
              title: post.title,
              slug: post.slug,
              content: post.content,
              excerpt: post.excerpt || '',
              published: !!post.published,
            });
          } else {
            setError('Post not found');
          }
        }
      } catch (err) {
        setError('Failed to load post');
      }
      setLoading(false);
    })();
  }, [authChecked, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save');
      }
    } catch {
      setError('Something went wrong');
    }
    setSaving(false);
  };

  if (!authChecked) return null;

  if (loading) {
    return <div className="max-w-3xl mx-auto py-12"><p className="text-muted">Loading...</p></div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold text-primary mb-8">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-secondary mb-1.5">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm focus:border-accent/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-secondary mb-1.5">Slug</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm font-mono focus:border-accent/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-secondary mb-1.5">Excerpt</label>
          <input
            type="text"
            value={form.excerpt}
            onChange={e => setForm({ ...form, excerpt: e.target.value })}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm focus:border-accent/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-secondary mb-1.5">Content (Markdown)</label>
          <textarea
            required
            rows={15}
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm font-mono focus:border-accent/40 transition-colors resize-y"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={e => setForm({ ...form, published: e.target.checked })}
            className="accent-accent"
          />
          <span className="text-sm text-secondary">Published</span>
        </label>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover disabled:opacity-50 transition-all"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-5 py-2.5 text-secondary text-sm rounded-lg border border-border hover:text-primary transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
