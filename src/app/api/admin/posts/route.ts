import { getDB } from '@/lib/db';

/**
 * Admin post list. The public /api/posts endpoint only returns published posts,
 * so drafts are invisible to it. This endpoint returns everything, which is what
 * the admin dashboard needs to list and edit drafts.
 */
export async function GET() {
  const db = await getDB();
  const posts = await db`
    SELECT id, title, slug, content, excerpt, published, created_at
    FROM posts
    ORDER BY created_at DESC
  `;
  return Response.json(posts);
}
