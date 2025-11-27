"use client";

import { formatDistanceToNow } from "date-fns";
import { useAppData } from "@/providers/app-data-provider";

export const XpTimeline = () => {
  const { xpTransactions } = useAppData();
  const transactions = xpTransactions.slice(0, 6);
  
  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6 text-white">
      <header>
        <p className="text-sm text-slate-400">History</p>
        <h3 className="text-2xl font-semibold">XP Timeline</h3>
      </header>
      <div className="mt-6 space-y-4">
        {transactions.map((txn) => (
          <div key={txn.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/40 px-4 py-3">
            <div>
              <p className="font-medium">{txn.reason}</p>
              <p className="text-xs text-slate-400">{formatDistanceToNow(new Date(txn.createdAt))} ago</p>
            </div>
            <span className="text-lg font-semibold text-emerald-300">+{txn.amount} XP</span>
          </div>
        ))}
      </div>
    </section>
  );
};
