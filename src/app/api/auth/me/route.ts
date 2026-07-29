import { getSession, COOKIE_NAME } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
  return Response.json({ authenticated: true, user: { id: session.id, username: session.username } });
}

export async function POST() {
  const response = Response.json({ success: true });
  response.headers.set(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
  return response;
}
