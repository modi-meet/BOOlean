import { AppShell } from "@/components/layout/app-shell";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ImpulseCTA } from "@/components/dashboard/impulse-cta";
import { SavingsChart } from "@/components/dashboard/savings-chart";
import { RecentImpulses } from "@/components/dashboard/recent-impulses";
import { FutureValueCard } from "@/components/dashboard/future-value-card";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Celebrate every resisted impulse">
      <StatsGrid />
      <ImpulseCTA />
      <div className="grid gap-6 lg:grid-cols-5">
        <Suspense fallback={<div className="rounded-3xl border border-white/5 bg-slate-900/50 p-6 text-white">Loading insights…</div>}>
          <SavingsChart />
        </Suspense>
        <FutureValueCard />
      </div>
      <RecentImpulses />
    </AppShell>
  );
}
