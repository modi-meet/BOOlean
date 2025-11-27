"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { DECISION_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppData } from "@/providers/app-data-provider";

export const RecentImpulses = () => {
  const { impulseLogs } = useAppData();
  const logs = impulseLogs.slice(0, 4);

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900/60 p-6">
      <header className="mb-4 flex items-center justify-between text-white">
        <div>
          <p className="text-sm text-slate-400">Recent Checks</p>
          <h3 className="text-2xl font-semibold">Impulse Logs</h3>
        </div>
        <Link href="/impulse/history" className="text-sm text-emerald-300 hover:text-emerald-200">
          View all
        </Link>
      </header>
      <div className="space-y-4">
        {logs.map((log) => (
          <article key={log.id} className="rounded-2xl border border-white/5 bg-slate-900/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.5em] text-slate-500">{log.category}</p>
                <h4 className="text-xl font-semibold text-white">{log.itemName}</h4>
              </div>
              <span className="text-xl font-semibold text-white">${log.itemPrice}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className={cn("font-semibold", DECISION_COLORS[log.decision])}>{log.decision}</span>
              {log.delayHours && (
                <span className="inline-flex items-center gap-1 text-amber-300">
                  <Clock className="h-3 w-3" />
                  {log.delayHours}h timer
                </span>
              )}
              <span className="capitalize">{formatDistanceToNow(new Date(log.decisionMadeAt))} ago</span>
              <Link href={`/impulse/${log.id}`} className="inline-flex items-center gap-1 text-emerald-300">
                Details
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
