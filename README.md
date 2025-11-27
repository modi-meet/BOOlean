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

### Supabase + Realtime Setup

1. Create a Supabase project, then run `supabase/schema.sql` in the SQL editor. This adds tables, helper triggers, seed data, and registers the tables with the default realtime publication.
2. Copy `.env.example` to `.env.local` and fill in:
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
	- `SUPABASE_SERVICE_ROLE_KEY` (needed if you later add server-side mutations)
	- `NEXT_PUBLIC_DEMO_USER_ID` (defaults to the seeded demo user)
3. Restart `npm run dev` so Next.js picks up env vars.
4. The app now reads and writes through Supabase clients:
	- `AppDataProvider` fetches profiles/stats/logs/xp/badges/leaderboard on mount
	- Supabase Realtime subscriptions keep dashboard/rewards/history views in sync
	- The impulse flow writes to `impulse_logs` + `xp_transactions` and relies on computed stats rows

If env vars are missing, the provider gracefully falls back to the local demo data for offline demos.

### PWA Notes

- `next-pwa` preconfigured (service worker disabled in dev).
- `src/app/manifest.ts` + placeholder icons under `public/`.

### Next Steps

1. Wire Supabase auth into the `(auth)` routes.
2. Replace Zustand demo data with Supabase fetches (RLS-safe selects + server actions).
3. Implement notifications/delay reminders (Supabase functions or OneSignal).
4. Add crypto reward mock once core loop is production-ready.
