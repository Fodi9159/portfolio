import { getDB } from '@/lib/db';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    const db = getDB();
    db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)').run(name, email, message);
    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
