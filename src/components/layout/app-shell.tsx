"use client";

import { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { cn } from "@/lib/utils";

interface AppShellProps {
  title?: string;
  subtitle?: string;
  hideNav?: boolean;
  children: ReactNode;
}

export const AppShell = ({ title, subtitle, hideNav, children }: AppShellProps) => {
  return (
    <div className="min-h-dvh bg-slate-950 text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-6 px-4 pb-32 pt-8 sm:px-6 lg:px-8">
        <header className={cn("space-y-2", hideNav && "pb-4")}>{
          title ? (
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">FinTracker GO : Anti-Impulse Defense</p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
              {subtitle && <p className="text-slate-400">{subtitle}</p>}
            </div>
          ) : null
        }</header>
        <main className="flex flex-1 flex-col gap-6">{children}</main>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
};
