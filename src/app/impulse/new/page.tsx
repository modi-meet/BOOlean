import { AppShell } from "@/components/layout/app-shell";
import { ImpulseFlow } from "@/components/impulse/impulse-flow";

export default function NewImpulsePage() {
  return (
    <AppShell title="Impulse Check" subtitle="Answer a few quick questions before you tap buy">
      <ImpulseFlow />
    </AppShell>
  );
}
