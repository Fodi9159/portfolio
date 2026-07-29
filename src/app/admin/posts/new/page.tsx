'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', content: '', excerpt: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) router.push('/admin/login');
      else setAuthChecked(true);
    })();
  }, [router]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setForm({ ...form, title, slug: generateSlug(title) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
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

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold text-primary mb-8">New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-secondary mb-1.5">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm focus:border-accent/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-secondary mb-1.5">Slug (URL)</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm font-mono focus:border-accent/40 transition-colors"
          />
          <p className="text-muted text-xs mt-1">URL-friendly: my-post-title</p>
        </div>
        <div>
          <label className="block text-sm text-secondary mb-1.5">Excerpt (preview text)</label>
          <input
            type="text"
            value={form.excerpt}
            onChange={e => setForm({ ...form, excerpt: e.target.value })}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-primary text-sm focus:border-accent/40 transition-colors"
            placeholder="Short description shown on the blog list"
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
            placeholder="Write your post content here..."
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover disabled:opacity-50 transition-all"
          >
            {saving ? 'Saving...' : 'Publish Post'}
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
