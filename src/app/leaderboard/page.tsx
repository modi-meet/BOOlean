import { AppShell } from "@/components/layout/app-shell";
import { LeaderboardList } from "@/components/leaderboard/leaderboard-list";

export default function LeaderboardPage() {
  return (
    <AppShell title="Leaderboard" subtitle="Friendly pressure keeps streaks alive">
      <LeaderboardList />
    </AppShell>
  );
}
