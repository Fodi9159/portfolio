import { getDB } from '@/lib/db';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    const db = await getDB();
    await db`INSERT INTO contacts (name, email, message) VALUES (${name}, ${email}, ${message})`;
    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
