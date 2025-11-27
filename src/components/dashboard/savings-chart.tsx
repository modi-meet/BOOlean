"use client";

import { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/format";
import { useAppData } from "@/providers/app-data-provider";

export const SavingsChart = () => {
  const { impulseLogs } = useAppData();

  const chartData = useMemo(() => {
    return impulseLogs
      .slice()
      .reverse()
      .map((log, index) => ({
        day: `Day ${index + 1}`,
        saved: log.decision === "resisted" ? log.itemPrice : 0,
        spent: log.decision === "purchased" ? log.itemPrice : 0,
      }))
      .slice(-7);
  }, [impulseLogs]);

  const totalSaved = chartData.reduce((sum, item) => sum + item.saved, 0);

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900/60 p-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Savings vs Impulse</p>
          <h3 className="text-2xl font-semibold text-white">{formatCurrency(totalSaved)}</h3>
          <p className="text-xs text-slate-400">Resisted in the last 7 checks</p>
        </div>
      </header>
      <div className="mt-6 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
            <defs>
              <linearGradient id="saved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                background: "#0F172A",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
              }}
              labelStyle={{ color: "white" }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Area type="monotone" dataKey="saved" stroke="#10B981" fillOpacity={1} fill="url(#saved)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
