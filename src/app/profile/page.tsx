import { AppShell } from "@/components/layout/app-shell";
import { ProfileCard } from "@/components/profile/profile-card";

export default function ProfilePage() {
  return (
    <AppShell title="Profile" subtitle="Tweak preferences whenever you like">
      <ProfileCard />
    </AppShell>
  );
}
