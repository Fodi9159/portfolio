import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'portfolio.db');

let db;

export function getDB() {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initDB();
  }
  return db;
}

function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  // Seed default admin if not exists (read password from env, or generate random)
  const admin = db.prepare('SELECT id FROM admin LIMIT 1').get();
  if (!admin) {
    const defaultPassword = process.env.ADMIN_PASSWORD || crypto.randomUUID().slice(0, 16);
    const hashed = bcrypt.hashSync(defaultPassword, 10);
    db.prepare('INSERT INTO admin (username, password) VALUES (?, ?)').run('admin', hashed);
    if (!process.env.ADMIN_PASSWORD) {
      console.log(`[portfolio] Admin password not set via ADMIN_PASSWORD env var. Generated random password: ${defaultPassword}`);
    }
  }

  // Seed sample blog posts if empty
  const count = db.prepare('SELECT COUNT(*) as c FROM posts').get();
  if (count.c === 0) {
    const seed = db.prepare(`INSERT INTO posts (title, slug, content, excerpt, created_at) VALUES (?, ?, ?, ?, ?)`);
    seed.run(
      'Building My First Website',
      'my-first-website',
      `## How It Started\n\nI wanted to build something I could show people. Not just a "Hello World", but a real, live website with a front-end, a back-end, and a database.\n\n## What I Learned\n\n- **Front-end**: HTML, CSS, JavaScript with React and Next.js\n- **Back-end**: API routes that handle data\n- **Database**: Storing and retrieving blog posts\n- **Deployment**: Putting it all online\n\n## What's Next\n\nThis is just the beginning. Every project I build teaches me something new.`,
      'The story of how this portfolio site came to life.',
      '2025-01-15 10:00:00'
    );
    seed.run(
      'Why I Use Dark Mode Everywhere',
      'dark-mode-life',
      `I used to be a "white background forever" person. Then I tried dark mode for a week and never went back.\n\n## It's Easier on the Eyes\n\nStaring at a bright screen at 11 PM? No thanks. Dark mode makes late-night coding sessions actually sustainable.\n\n## It Looks Clean\n\nLet's be honest: dark UI with the right accent colors just looks *good*. It's why most dev tools default to dark themes now.\n\n## The Setup\n\nI run:\n- VS Code: Dark Modern theme\n- Terminal: Green on black\n- This site: You're looking at it`,
      'Why dark mode is superior, and how I use it.',
      '2025-02-20 14:30:00'
    );
    seed.run(
      'Front-end vs Back-end: What I Actually Learned',
      'frontend-vs-backend',
      `When I started, I thought "front-end" meant making things pretty and "back-end" meant math.\n\nTurns out, it's more interesting than that.\n\n## Front-end\n\nThis is everything you see and click. The buttons, the layout, the animations, the forms. It's not just "making it pretty", it's about how the user experiences the site.\n\n## Back-end\n\nThis is everything *behind* the scenes. When you submit a contact form, the back-end saves it to a database. When you load a blog post, the back-end fetches it and sends it to the front-end.\n\n## The Magic\n\nThe real magic is how they talk to each other. The front-end says "hey, give me the blog posts" and the back-end responds with the data. That conversation happens in milliseconds.`,
      'Breaking down the two sides of web development.',
      '2025-03-10 09:00:00'
    );
  }
}

export function authenticateUser(username, password) {
  const db = getDB();
  const user = db.prepare('SELECT * FROM admin WHERE username = ?').get(username);
  if (!user) return null;
  const valid = bcrypt.compareSync(password, user.password);
  return valid ? { id: user.id, username: user.username } : null;
}
