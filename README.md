# Portfolio & Blog Platform

A full-stack portfolio site I designed and built from scratch. It has a public front-end, a
REST API back-end, a SQLite database, and a password-protected admin area for writing and
publishing blog posts.

The point of this project was to answer a real question, "have you built something you can
explain piece by piece?" This is that something.

## Live demo

Not deployed yet. To see it running locally, follow the setup below.

## Features

- **Full-stack Next.js (App Router)**, written in TypeScript end to end
- **SQLite database** via better-sqlite3, with WAL mode for concurrent reads
- **Authentication**: bcrypt-hashed passwords, JWT sessions in an HttpOnly cookie
- **Admin dashboard**: create, edit, and delete blog posts
- **Markdown blog**: posts stored in SQLite and rendered with react-markdown at slug URLs
- **Contact form**: submissions validated and persisted to the database
- **REST API**: posts CRUD, contact submission, and session endpoints
- **Test suite**: Vitest + Testing Library covering pages and components

## Tech stack

| Layer     | Choice                                   |
| --------- | ---------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack)       |
| Language  | TypeScript                               |
| UI        | React 19, Tailwind CSS 4                 |
| Database  | SQLite (better-sqlite3)                  |
| Auth      | jsonwebtoken, bcryptjs                   |
| Testing   | Vitest, Testing Library, jsdom           |

## Getting started

Requires Node.js 20 or newer.

```bash
# 1. Clone and enter the project
git clone <your-repo-url>
cd portfolio

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

Then edit `.env` and set two values:

```bash
ADMIN_PASSWORD=your-admin-password
JWT_SECRET=long-random-string-here
```

If you leave `ADMIN_PASSWORD` unset, a random password is generated and printed to the
terminal on first run, so the admin panel is never left wide open.

```bash
# 4. Start the development server
npm run dev
```

Open http://localhost:3000. The admin panel is at http://localhost:3000/admin.

## Scripts

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Start the dev server with hot reload  |
| `npm run build`      | Build the production bundle           |
| `npm run start`      | Serve the production build            |
| `npm run test`       | Run the test suite once               |
| `npm run test:watch` | Run tests in watch mode                |
| `npm run lint`       | Lint the codebase                     |

## Project structure

```
src/
  app/
    page.tsx              Home
    about/page.tsx        About
    projects/page.tsx     Projects
    blog/page.tsx         Blog index
    blog/[slug]/page.tsx  Individual post
    contact/page.tsx      Contact form
    admin/                Login, dashboard, post editor
    api/
      posts/              GET (list / by slug), POST (create)
      posts/[id]/         PUT, DELETE
      contact/            POST (save submission)
      auth/               POST (login), session check
  components/             Header, Footer
  lib/
    db.ts                 Database connection, schema, seeding
    auth.ts               Token signing, verification, session
  __tests__/              Vitest + Testing Library suites
```

## Database

SQLite, stored as `portfolio.db` in the project root. Three tables:

| Table      | Purpose                                          |
| ---------- | ------------------------------------------------ |
| `posts`    | Blog posts: title, slug, content, excerpt        |
| `contacts` | Contact form submissions                         |
| `admin`    | Single admin user with a bcrypt-hashed password  |

The schema is created automatically on first run, along with a default admin user and three
sample posts. The database file is gitignored, so it is never committed.

## Testing

```bash
npm run test
```

The suite covers the home, about, and 404 pages, plus the header and footer components,
using jsdom as the environment.

## A note on how this was built

I used AI as a pair-programmer throughout: for boilerplate, explanations, and debugging help.
The architectural decisions are mine. The data model, the auth flow, the API design, and the
page structure were chosen by me, and the test suite was added by me to keep the result honest.
Disclosing this because it is the accurate description of how the work was done.

## License

MIT
