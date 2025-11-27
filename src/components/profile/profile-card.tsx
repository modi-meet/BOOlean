"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/providers/app-data-provider";

export const ProfileCard = () => {
  const { profile, stats } = useAppData();

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-white">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} />
          <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-semibold">{profile.name}</h3>
          <p className="text-sm text-slate-400">{profile.city} · Tier {profile.cityTier.replace("tier", "")}</p>
          <p className="text-sm text-slate-400">Age {profile.age} · {profile.incomeType.replace("_", " ")}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Monthly income</p>
          <p className="text-2xl font-semibold">${profile.monthlyIncome}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Monthly expenses</p>
          <p className="text-2xl font-semibold">${profile.monthlyExpenses}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">Streak: {stats.currentStreak} days</p>
      <Button className="mt-4 w-full rounded-2xl bg-white text-slate-900">Edit profile</Button>
    </section>
  );
};
