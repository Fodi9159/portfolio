import { getDB } from '@/lib/db';

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const { title, slug, content, excerpt, published } = await request.json();
    const db = getDB();
    db.prepare(
      `UPDATE posts SET title=?, slug=?, content=?, excerpt=?, published=?, updated_at=datetime('now') WHERE id=?`
    ).run(title, slug, content, excerpt || '', published ? 1 : 0, id);
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const db = getDB();
    db.prepare('DELETE FROM posts WHERE id = ?').run(id);
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
