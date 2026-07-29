import { authenticateUser } from '@/lib/db';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const user = authenticateUser(username, password);
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    return Response.json({ success: true, user });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
