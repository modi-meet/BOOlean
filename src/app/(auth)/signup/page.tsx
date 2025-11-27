import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/app-shell";

export default function SignupPage() {
  return (
    <AppShell title="Join the beta" subtitle="It takes 60 seconds to set up" hideNav>
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-white">
        <form className="space-y-4">
          <div>
            <label className="text-sm text-slate-300" htmlFor="name">Name</label>
            <Input id="name" placeholder="Demo User" className="mt-1 bg-slate-950/30 text-white" />
          </div>
          <div>
            <label className="text-sm text-slate-300" htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="you@email.com" className="mt-1 bg-slate-950/30 text-white" />
          </div>
          <div>
            <label className="text-sm text-slate-300" htmlFor="password">Password</label>
            <Input id="password" type="password" placeholder="Create a strong password" className="mt-1 bg-slate-950/30 text-white" />
          </div>
          <Button type="submit" className="w-full rounded-2xl bg-emerald-500 text-white">Create account</Button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-emerald-300">Log in</Link>
        </p>
      </div>
    </AppShell>
  );
}
