# Polar Edge Analytics 🥶📊

## Installation

### Prerequisites

- Node.js
- Docker Desktop

### Supabase Setup

To set up Supabase, follow the installation guide on [their website](https://supabase.com/docs/guides/cli/getting-started).

Before continuing, ensure supabase is running via `supabase start`

### Next.js Setup

In the `next` directory, create a new file called `.env.local`. Create an environmental variable called `POSTGRES_URL`. Use `supabase status` in the terminal to get the value you need. The end result should look something like this:

```txt
POSTGRES_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
```

Run `npm i` in the terminal (make sure you're still in `next`) to install the project dependencies.

To get the latest version of the project's schemas, run `npx drizzle-kit migrate`.

The server can then be run via `npm run dev`
