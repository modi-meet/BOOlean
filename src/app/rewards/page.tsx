import { AppShell } from "@/components/layout/app-shell";
import { XpOverview } from "@/components/rewards/xp-overview";
import { BadgeGrid } from "@/components/rewards/badge-grid";
import { XpTimeline } from "@/components/rewards/xp-timeline";

export default function RewardsPage() {
  return (
    <AppShell title="Rewards" subtitle="XP, badges, and streak dopamine">
      <XpOverview />
      <BadgeGrid />
      <XpTimeline />
    </AppShell>
  );
}
