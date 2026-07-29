'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(() => {
    if (typeof window !== 'undefined')
      return sessionStorage.getItem('admin_auth') === 'true';
    return false;
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push('/admin/login');
      return;
    }
    (async () => {
      try {
        const res = await fetch('/api/posts');
        if (res.ok) setPosts(await res.json());
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, [auth, router]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      const updated = await fetch('/api/posts');
      if (updated.ok) setPosts(await updated.json());
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };

  if (!auth) return null;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-secondary text-sm mt-1">Manage your blog posts</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-all"
          >
            + New Post
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-secondary text-sm rounded-lg border border-border hover:text-primary hover:border-[var(--border)] transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted text-center py-12">Loading...</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <p className="text-muted mb-4">No posts yet.</p>
          <Link href="/admin/posts/new" className="text-accent text-sm hover:underline">
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface">
              <div className="min-w-0">
                <h3 className="text-primary text-sm font-medium truncate">{post.title}</h3>
                <p className="text-muted text-xs mt-0.5">
                  {new Date(post.created_at).toLocaleDateString()} · {post.published ? 'Published' : 'Draft'}
                </p>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="px-3 py-1.5 text-xs text-secondary border border-border rounded-lg hover:text-primary hover:bg-surface transition-all"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1.5 text-xs text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
