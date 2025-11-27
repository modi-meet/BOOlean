import Link from "next/link";

const heroStats = [
  { label: "Impulses resisted", value: "12" },
  { label: "XP earned", value: "2,450" },
  { label: "Streak", value: "15 days" },
];

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-center gap-8 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="space-y-8">
        <p className="text-sm uppercase tracking-[0.8em] text-emerald-200/80">Anti-Impulse Defense System</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
          Make not buying feel better than buying.
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Intercept impulse purchases with a playful question flow, celebrate resistance with XP, and keep
          your streak alive. Built for Gen Z attention spans and dopamine wiring.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-lg font-semibold text-slate-950 shadow-2xl shadow-emerald-500/30"
          >
            Join the beta
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-lg font-semibold text-white"
          >
            View demo
          </Link>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {heroStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
