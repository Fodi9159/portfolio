import { login, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const result = await login(username, password);
    if (!result) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = Response.json({ success: true });
    response.headers.set(
      'Set-Cookie',
      `${COOKIE_NAME}=${result.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
    );
    return response;
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
