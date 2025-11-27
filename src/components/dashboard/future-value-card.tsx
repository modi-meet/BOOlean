"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/providers/app-data-provider";
import { formatCurrency } from "@/lib/format";

const INVEST_RETURN = 1.07;
const GOLD_BASELINE = 6000;

export const FutureValueCard = () => {
  const { stats } = useAppData();
  const [mode, setMode] = useState<"stocks" | "gold">("stocks");

  const calculations = useMemo(() => {
    const fv5 = stats.totalSaved * Math.pow(INVEST_RETURN, 5);
    const fv10 = stats.totalSaved * Math.pow(INVEST_RETURN, 10);
    const goldGrams = stats.totalSaved / GOLD_BASELINE;

    return { fv5, fv10, goldGrams };
  }, [stats.totalSaved]);

  return (
    <section className="rounded-3xl border border-amber-400/20 bg-white/5 p-6 text-white">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-amber-200/80">If you invested instead</p>
          <h3 className="text-2xl font-semibold">Future Value</h3>
        </div>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5">
          {(["stocks", "gold"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setMode(option)}
              className={`px-3 py-1 text-xs font-semibold capitalize ${mode === option ? "rounded-full bg-white text-slate-900" : "text-white/70"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </header>
      {mode === "stocks" ? (
        <div className="mt-6 space-y-3">
          <div>
            <p className="text-xs text-slate-300">In 5 years @7%</p>
            <p className="text-3xl font-semibold text-emerald-300">{formatCurrency(calculations.fv5)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-300">In 10 years @7%</p>
            <p className="text-3xl font-semibold text-emerald-200">{formatCurrency(calculations.fv10)}</p>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-xs text-slate-300">Gold at ₹6,000/g</p>
          <p className="text-4xl font-semibold text-amber-300">{calculations.goldGrams.toFixed(2)} g</p>
        </div>
      )}
      <p className="mt-4 text-xs text-slate-400">Stay consistent and let compounding do its thing.</p>
    </section>
  );
};
