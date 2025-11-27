import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/app-shell";

export default function LoginPage() {
  return (
    <AppShell title="Welcome back" subtitle="Log in to protect another impulse" hideNav>
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-white">
        <form className="space-y-4">
          <div>
            <label className="text-sm text-slate-300" htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="you@email.com" className="mt-1 bg-slate-950/30 text-white" />
          </div>
          <div>
            <label className="text-sm text-slate-300" htmlFor="password">Password</label>
            <Input id="password" type="password" placeholder="••••••••" className="mt-1 bg-slate-950/30 text-white" />
          </div>
          <Button type="submit" className="w-full rounded-2xl bg-emerald-500 text-white">Continue</Button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-400">
          New here? <Link href="/signup" className="text-emerald-300">Create an account</Link>
        </p>
      </div>
    </AppShell>
  );
}
