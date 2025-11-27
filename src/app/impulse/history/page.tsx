import { AppShell } from "@/components/layout/app-shell";
import { ImpulseHistoryList } from "@/components/impulse/impulse-history-list";

export default function ImpulseHistoryPage() {
  return (
    <AppShell title="Impulse History" subtitle="Receipts of your self-control flex">
      <ImpulseHistoryList />
    </AppShell>
  );
}
