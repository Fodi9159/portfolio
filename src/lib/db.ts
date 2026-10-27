import postgres, { type Sql } from 'postgres';
import bcrypt from 'bcryptjs';

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  created_at: Date;
  updated_at: Date | null;
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: Date;
};

export type AdminUser = {
  id: number;
  username: string;
  password: string;
};

let connection: Promise<Sql> | null = null;

/**
 * Returns a connected, initialised Postgres client. The connection string comes
 * from the host, never from the repo.
 *
 * Prepared statements are off because Supabase's pooled connection (port 6543,
 * transaction mode) does not support them. The tagged template used everywhere
 * still parameterises values, so this is not an injection risk.
 */
export function getDB(): Promise<Sql> {
  if (!connection) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return Promise.reject(
        new Error(
          '[portfolio] DATABASE_URL is not set. Add it as an environment variable with your Postgres connection string.'
        )
      );
    }
    connection = (async () => {
      const db = postgres(connectionString, { prepare: false, max: 5 });
      await initSchema(db);
      return db;
    })();
  }
  return connection;
}

async function initSchema(db: Sql) {
  await db`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS admin (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;

  // Seed or update the admin user. The password always comes from the
  // ADMIN_PASSWORD environment variable so that changing it in the host
  // environment takes effect on the next request, not just on first run.
  const defaultPassword = process.env.ADMIN_PASSWORD || crypto.randomUUID().slice(0, 16);
  const hashed = bcrypt.hashSync(defaultPassword, 10);
  const adminRow = await db<{ id: number }[]>`SELECT id FROM admin LIMIT 1`;
  if (adminRow.length === 0) {
    await db`INSERT INTO admin (username, password) VALUES (${'admin'}, ${hashed})`;
  } else {
    await db`UPDATE admin SET password = ${hashed} WHERE username = ${'admin'}`;
  }
  if (!process.env.ADMIN_PASSWORD) {
    console.log(
      `[portfolio] ADMIN_PASSWORD is not set. Using generated password: ${defaultPassword}`
    );
  }

  // Seed sample posts only when the blog is empty, so a redeploy never
  // duplicates them.
  const count = await db<{ c: string }[]>`SELECT COUNT(*) AS c FROM posts`;
  if (Number(count[0].c) === 0) {
    await db`
      INSERT INTO posts (title, slug, content, excerpt, created_at) VALUES
      ('Building My First Website', 'my-first-website',
       ${`## How It Started\n\nI wanted to build something I could show people. Not just a "Hello World", but a real, live website with a front-end, a back-end, and a database.\n\n## What I Learned\n\n- **Front-end**: HTML, CSS, JavaScript with React and Next.js\n- **Back-end**: API routes that handle data\n- **Database**: Storing and retrieving blog posts\n\n## What's Next\n\nThis is just the beginning. Every project I build teaches me something new.`},
       ${'The story of how this portfolio site came to life.'},
       ${'2025-01-15 10:00:00'})
    `;
    await db`
      INSERT INTO posts (title, slug, content, excerpt, created_at) VALUES
      ('Why I Use Dark Mode Everywhere', 'dark-mode-life',
       ${`I used to be a "white background forever" person. Then I tried dark mode for a week and never went back.\n\n## It's Easier on the Eyes\n\nStaring at a bright screen at 11 PM? No thanks. Dark mode makes late-night coding sessions actually sustainable.\n\n## It Looks Clean\n\nLet's be honest: dark UI with the right accent colors just looks *good*. It's why most dev tools default to dark themes now.\n\n## The Setup\n\nI run:\n- VS Code: Dark Modern theme\n- Terminal: Green on black\n- This site: You're looking at it`},
       ${'Why dark mode is superior, and how I use it.'},
       ${'2025-02-20 14:30:00'})
    `;
    await db`
      INSERT INTO posts (title, slug, content, excerpt, created_at) VALUES
      ('Front-end vs Back-end: What I Actually Learned', 'frontend-vs-backend',
       ${`When I started, I thought "front-end" meant making things pretty and "back-end" meant math.\n\nTurns out, it's more interesting than that.\n\n## Front-end\n\nThis is everything you see and click. The buttons, the layout, the animations, the forms. It's not just "making it pretty", it's about how the user experiences the site.\n\n## Back-end\n\nThis is everything *behind* the scenes. When you submit a contact form, the back-end saves it to a database. When you load a blog post, the back-end fetches it and sends it to the front-end.\n\n## The Magic\n\nThe real magic is how they talk to each other. The front-end says "hey, give me the blog posts" and the back-end responds with the data. That conversation happens in milliseconds.`},
       ${'Breaking down the two sides of web development.'},
       ${'2025-03-10 09:00:00'})
    `;
  }
}

export async function authenticateUser(username: string, password: string) {
  const db = await getDB();
  const rows = await db<AdminUser[]>`SELECT * FROM admin WHERE username = ${username}`;
  const user = rows[0];
  if (!user) return null;
  const valid = bcrypt.compareSync(password, user.password);
  return valid ? { id: user.id, username: user.username } : null;
}
