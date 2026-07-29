import { getDB } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  const db = getDB();

  if (slug) {
    const post = db.prepare('SELECT * FROM posts WHERE slug = ? AND published = 1').get(slug);
    if (!post) {
      return Response.json(null, { status: 404 });
    }
    return Response.json(post);
  }

  const posts = db.prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC').all();
  return Response.json(posts);
}

export async function POST(request) {
  try {
    const { title, slug, content, excerpt } = await request.json();
    const db = getDB();
    const result = db.prepare(
      'INSERT INTO posts (title, slug, content, excerpt) VALUES (?, ?, ?, ?)'
    ).run(title, slug, content, excerpt || '');
    return Response.json({ id: result.lastInsertRowid }, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
