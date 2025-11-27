"use client";

import { DECISION_COLORS } from "@/lib/constants";
import { useAppData } from "@/providers/app-data-provider";

export const ImpulseHistoryList = () => {
  const { impulseLogs } = useAppData();
  const logs = impulseLogs;

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <article key={log.id} className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">{log.category}</p>
              <h4 className="text-2xl font-semibold">{log.itemName}</h4>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Decision</p>
              <p className={`text-xl font-semibold ${DECISION_COLORS[log.decision]}`}>{log.decision}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
