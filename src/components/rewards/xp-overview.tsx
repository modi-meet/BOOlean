"use client";

import { calculateLevel, formatNumber } from "@/lib/format";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { useAppData } from "@/providers/app-data-provider";

export const XpOverview = () => {
  const { stats } = useAppData();
  const xpMeta = calculateLevel(stats.totalXp);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-white">
      <header className="flex items-center gap-2 text-sm uppercase tracking-[0.5em] text-emerald-200/80">
        <Trophy className="h-4 w-4 text-emerald-300" /> XP Vault
      </header>
      <div className="mt-4 text-4xl font-semibold">{formatNumber(stats.totalXp)} XP</div>
      <p className="text-sm text-slate-400">Level {xpMeta.level} · {xpMeta.xpToNextLevel} XP until Level {xpMeta.level + 1}</p>
      <Progress
        className="mt-4 h-3 bg-white/10"
        value={
          ((stats.totalXp - xpMeta.currentLevelBase) /
            Math.max(xpMeta.nextLevelXp - xpMeta.currentLevelBase, 1)) *
          100
        }
      />
    </section>
  );
};
