"use client";

import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppData } from "@/providers/app-data-provider";

const tierStyles = [
  "border-amber-300 bg-amber-400/10",
  "border-slate-100 bg-slate-100/10",
  "border-rose-200 bg-rose-200/10",
];

export const LeaderboardList = () => {
  const { leaderboard } = useAppData();

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-white">
      <header className="flex items-center gap-2">
        <Crown className="h-5 w-5 text-amber-300" />
        <div>
          <p className="text-sm text-slate-400">Friends mode</p>
          <h3 className="text-2xl font-semibold">Leaderboard</h3>
        </div>
      </header>
      <div className="mt-6 space-y-4">
        {leaderboard.map((entry, index) => (
          <article
            key={entry.id}
            className={cn(
              "flex items-center justify-between rounded-2xl border px-4 py-3",
              index < 3 ? tierStyles[index] : "border-white/5 bg-slate-950/40"
            )}
          >
            <div>
              <p className="text-sm text-slate-400">#{entry.rank}</p>
              <h4 className="text-xl font-semibold">{entry.name}</h4>
              <p className="text-xs text-slate-400">Streak {entry.streak} days</p>
            </div>
            <span className="text-xl font-semibold text-emerald-300">{entry.xp} XP</span>
          </article>
        ))}
      </div>
    </section>
  );
};
