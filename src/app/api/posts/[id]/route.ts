import { getDB } from '@/lib/db';

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const { title, slug, content, excerpt, published } = await request.json();
    const db = await getDB();
    await db`
      UPDATE posts
      SET title = ${title}, slug = ${slug}, content = ${content},
          excerpt = ${excerpt || ''}, published = ${!!published}, updated_at = now()
      WHERE id = ${id}
    `;
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const db = await getDB();
    await db`DELETE FROM posts WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
