"use client";

import { BadgeCheck } from "lucide-react";
import { useAppData } from "@/providers/app-data-provider";

export const BadgeGrid = () => {
  const { badges } = useAppData();

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6">
      <header className="flex items-center gap-2 text-white">
        <BadgeCheck className="h-5 w-5 text-amber-300" />
        <div>
          <p className="text-sm text-slate-400">Dopamine trophies</p>
          <h3 className="text-2xl font-semibold">Badges</h3>
        </div>
      </header>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {badges.map((badge) => (
          <article
            key={badge.id}
            className={`rounded-2xl border p-4 ${badge.earned ? "border-emerald-300/40 bg-emerald-500/10" : "border-white/10 bg-slate-950/30"}`}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{badge.tier}</p>
            <h4 className="text-xl font-semibold text-white">{badge.name}</h4>
            <p className="text-sm text-slate-400">{badge.description}</p>
            <p className="mt-3 text-xs text-emerald-200">
              {badge.earned ? `Unlocked ${new Date(badge.earnedAt ?? "").toLocaleDateString()}` : "Locked"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
