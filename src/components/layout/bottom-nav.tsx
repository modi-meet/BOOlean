"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartNoAxesCombined, Home, Trophy, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/rewards", label: "Rewards", icon: Trophy },
  { href: "/impulse/new", label: "Impulse", icon: Zap },
  { href: "/leaderboard", label: "Leaders", icon: ChartNoAxesCombined },
  { href: "/profile", label: "Profile", icon: User },
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[min(420px,90%)] items-center justify-between rounded-3xl border border-white/5 bg-slate-900/90 px-6 py-3 shadow-2xl shadow-emerald-500/10 backdrop-blur">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs font-medium transition",
              isActive ? "text-emerald-300" : "text-slate-400 hover:text-white"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive && "scale-110 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]")}/>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
