"use client";

import { useMemo } from "react";
import { formatNumber } from "@/lib/format";
import { Flame, Shield, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { calculateLevel } from "@/lib/format";
import { useAppData } from "@/providers/app-data-provider";

export const StatsGrid = () => {
  const { stats } = useAppData();
  const xpMeta = useMemo(() => calculateLevel(stats.totalXp), [stats.totalXp]);

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <article className="rounded-2xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/20 to-slate-900 p-4 shadow-lg shadow-emerald-500/20">
        <header className="flex items-center justify-between text-sm text-slate-300">
          <span>XP Progress</span>
          <Sparkles className="h-4 w-4 text-amber-300" />
        </header>
        <div className="mt-2 text-3xl font-semibold text-white">{formatNumber(stats.totalXp)} XP</div>
        <p className="text-xs text-slate-400">Level {xpMeta.level} · {xpMeta.xpToNextLevel} XP to go</p>
        <Progress
          className="mt-4 h-2 bg-white/5"
          value={
            ((stats.totalXp - xpMeta.currentLevelBase) /
              Math.max(xpMeta.nextLevelXp - xpMeta.currentLevelBase, 1)) *
            100
          }
        />
      </article>

      <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <header className="flex items-center gap-2 text-sm text-slate-300">
          <Shield className="h-4 w-4 text-slate-100" />
          Shield Points
        </header>
        <div className="mt-2 text-3xl font-semibold text-white">{stats.shieldPoints}</div>
        <p className="text-xs text-slate-400">Use to forgive an impulse without breaking your streak.</p>
      </article>

      <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <header className="flex items-center gap-2 text-sm text-slate-300">
          <Flame className="h-4 w-4 text-orange-400" />
          Streak Heat
        </header>
        <div className="mt-2 text-3xl font-semibold text-white">{stats.currentStreak} days</div>
        <p className="text-xs text-slate-400">Longest streak {stats.longestStreak} days</p>
      </article>
    </section>
  );
};
