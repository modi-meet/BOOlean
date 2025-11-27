## Anti-Impulse Defense System

Psychology-powered PWA that helps Gen Z/Millennials pause impulse purchases with playful questions, XP rewards, and streak pressure.

### Stack

- Next.js 16 (App Router, PWA via `next-pwa`)
- Tailwind CSS v4 + shadcn/ui primitives
- Supabase (Auth + Postgres) client helpers
- Zustand store for optimistic demo data
- Recharts + Framer Motion for dopamine visuals

### Quick Start

```bash
npm install
npm run dev
# app runs on http://localhost:3000
```

1. Copy `.env.example` to `.env.local` and fill in Supabase keys.
2. Start the dev server (`npm run dev`).
3. Explore the flows:
	- `/dashboard` – stats, charts, and recent impulse logs
	- `/impulse/new` – multi-step impulse check wizard
	- `/rewards`, `/leaderboard`, `/profile` – gamification + social layers

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start local dev server |
| `npm run build` | Production build with PWA artifacts |
| `npm run start` | Run production server |
| `npm run lint` | ESLint (Next.js defaults) |

### Supabase Setup

Database tables are defined in `context.md` (profiles, impulse_logs, xp_transactions, etc.). Once your Supabase project is ready:

1. Create the tables via SQL editor (copy from context).
2. Add URL + anon key to `.env.local`.
3. (Optional) add `SUPABASE_SERVICE_ROLE_KEY` for server actions.
4. Extend the mocked Zustand store with real Supabase queries when backend is ready.

### PWA Notes

- `next-pwa` preconfigured (service worker disabled in dev).
- `src/app/manifest.ts` + placeholder icons under `public/`.

### Next Steps

1. Wire Supabase auth into the `(auth)` routes.
2. Replace Zustand demo data with Supabase fetches (RLS-safe selects + server actions).
3. Implement notifications/delay reminders (Supabase functions or OneSignal).
4. Add crypto reward mock once core loop is production-ready.
