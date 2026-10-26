import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { authenticateUser } from '@/lib/db';

// Local development falls back to a fixed value so the admin panel works out
// of the box. In production that would let anyone forge an admin session, so
// the secret is required and the server refuses to sign tokens without it.
function getSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      '[portfolio] JWT_SECRET is not set. Add it as an environment variable in your host dashboard before starting the server.'
    );
  }
  return 'portfolio-dev-secret-change-in-production';
}

export const COOKIE_NAME = 'admin_token';

export function signToken(user: { id: number; username: string }) {
  return jwt.sign({ id: user.id, username: user.username }, getSecret(), { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, getSecret()) as { id: number; username: string; iat: number; exp: number };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function login(username: string, password: string) {
  const user = await authenticateUser(username, password);
  if (!user) return null;
  return { user, token: signToken(user) };
}
