import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { authenticateUser } from '@/lib/db';

const SECRET = process.env.JWT_SECRET || 'portfolio-dev-secret-change-in-production';
export const COOKIE_NAME = 'admin_token';

export function signToken(user: { id: number; username: string }) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { id: number; username: string; iat: number; exp: number };
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
  const user = authenticateUser(username, password);
  if (!user) return null;
  return { user, token: signToken(user) };
}
