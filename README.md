# Next.js Supabase Blog Migration

This project has been migrated from vanilla HTML/CSS to a Next.js application hooked into a Supabase Postgres backend.

## Instructions to Run

1. Open a terminal in this directory.
2. Ensure you've initialized Node/npm using your preferred NVM layer (`nvm use 22`).
3. Run `npm run dev` to start the Next.js development server.
4. Visit `http://localhost:3000` in your browser.

## Supabase Database Setup

For the dynamic blog parts to work correctly, you must go to your Supabase project dashboard, navigate to the **SQL Editor**, and run the SQL code inside `database_setup.sql`. This will:
- Create the `posts` table
- Enforce public rules (RLS) so only authenticated users (you) can make posts
- Enforce rules so only `published` posts are viewable by everyone else.
