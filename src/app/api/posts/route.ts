import { getDB } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const db = await getDB();

  if (slug) {
    const rows = await db`SELECT * FROM posts WHERE slug = ${slug} AND published = ${true}`;
    if (rows.length === 0) {
      return Response.json(null, { status: 404 });
    }
    return Response.json(rows[0]);
  }

  const posts = await db`SELECT * FROM posts WHERE published = ${true} ORDER BY created_at DESC`;
  return Response.json(posts);
}

export async function POST(request) {
  try {
    const { title, slug, content, excerpt } = await request.json();
    const db = await getDB();
    const rows = await db<{ id: number }[]>`
      INSERT INTO posts (title, slug, content, excerpt)
      VALUES (${title}, ${slug}, ${content}, ${excerpt || ''})
      RETURNING id
    `;
    return Response.json({ id: rows[0].id }, { status: 201 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
