import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export const ImpulseCTA = () => (
  <section className="rounded-3xl border border-white/10 bg-linear-to-r from-emerald-500/20 via-slate-900 to-indigo-500/20 p-6 text-white shadow-[0_10px_70px_rgba(16,185,129,0.2)]">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.5em] text-emerald-200/80">Core Loop</p>
        <h2 className="mt-2 text-3xl font-semibold">Impulse Check</h2>
        <p className="text-slate-200/80">About to buy something? Run it through the dopamine filter first.</p>
      </div>
      <Link
        href="/impulse/new"
        className="group inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-950 shadow-2xl shadow-emerald-500/30 transition hover:-translate-y-1"
      >
        <Zap className="h-5 w-5 text-emerald-500" />
        Start impulse check
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </div>
  </section>
);
