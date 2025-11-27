"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  demoBadges,
  demoImpulseLogs,
  demoLeaderboard,
  demoProfile,
  demoStats,
  demoXpTransactions,
} from "@/lib/demo-data";
import {
  Badge,
  ImpulseAnswers,
  ImpulseLog,
  LeaderboardEntry,
  Profile,
  RecommendationResult,
  UserStats,
  XPTransaction,
} from "@/types";
import {
  mapBadge,
  mapImpulseLog,
  mapLeaderboardEntry,
  mapProfile,
  mapUserStats,
  mapXpTransaction,
} from "@/lib/mappers";

interface LogImpulsePayload {
  itemName: string;
  itemPrice: number;
  category: string;
  image?: string;
  answers: ImpulseAnswers;
  recommendation: RecommendationResult;
}

interface AppDataState {
  loading: boolean;
  profile: Profile;
  stats: UserStats;
  impulseLogs: ImpulseLog[];
  xpTransactions: XPTransaction[];
  badges: Badge[];
  leaderboard: LeaderboardEntry[];
}

interface AppDataContextValue extends AppDataState {
  refresh: () => Promise<void>;
  logImpulse: (payload: LogImpulsePayload) => Promise<void>;
}

const fallbackState: AppDataState = {
  loading: false,
  profile: demoProfile,
  stats: demoStats,
  impulseLogs: demoImpulseLogs,
  xpTransactions: demoXpTransactions,
  badges: demoBadges,
  leaderboard: demoLeaderboard,
};

const AppDataContext = createContext<AppDataContextValue>({
  ...fallbackState,
  refresh: async () => undefined,
  logImpulse: async () => undefined,
});

const DEMO_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID ?? demoProfile.id;
const SUPABASE_READY = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [state, setState] = useState<AppDataState>(fallbackState);
  const userId = DEMO_USER_ID;

  const refresh = useCallback(async () => {
    if (!SUPABASE_READY) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    const [profileRes, statsRes, logsRes, xpRes, badgesRes, leaderboardRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("user_stats").select("*").eq("user_id", userId).maybeSingle(),
      supabase
        .from("impulse_logs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("xp_transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(25),
      supabase
        .from("user_badges")
        .select("*, badges(*)")
        .eq("user_id", userId),
      supabase
        .from("leaderboard_view")
        .select("user_id, name, avatar_url, total_xp, current_streak, rank")
        .order("total_xp", { ascending: false })
        .limit(10),
    ]);

    const profile = profileRes.data ? mapProfile(profileRes.data) : demoProfile;
    const stats = statsRes.data ? mapUserStats(statsRes.data) : demoStats;
    const impulseLogs: ImpulseLog[] = logsRes.data
      ? logsRes.data.map((row) => mapImpulseLog(row))
      : demoImpulseLogs;
    const xpTransactions: XPTransaction[] = xpRes.data
      ? xpRes.data.map((row) => mapXpTransaction(row))
      : demoXpTransactions;
    const badges: Badge[] = badgesRes.data ? badgesRes.data.map((row) => mapBadge(row)) : demoBadges;
    const leaderboard: LeaderboardEntry[] = leaderboardRes.data
      ? leaderboardRes.data.map((entry, index) => mapLeaderboardEntry(entry, index))
      : demoLeaderboard;

    setState({
      loading: false,
      profile,
      stats,
      impulseLogs,
      xpTransactions,
      badges,
      leaderboard,
    });
  }, [supabase, userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!SUPABASE_READY) return;

    const channel = supabase
      .channel(`app-data-${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "impulse_logs", filter: `user_id=eq.${userId}` },
        () => refresh(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "xp_transactions", filter: `user_id=eq.${userId}` },
        () => refresh(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_stats", filter: `user_id=eq.${userId}` },
        () => refresh(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_badges", filter: `user_id=eq.${userId}` },
        () => refresh(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh, supabase, userId]);

  const logImpulse = useCallback(
    async ({ itemName, itemPrice, category, image, answers, recommendation }: LogImpulsePayload) => {
      const xpReward = recommendation.xpReward ?? Math.round(itemPrice / 10);
      const newLog: ImpulseLog = {
        id: crypto.randomUUID(),
        itemName,
        itemPrice,
        category,
        itemImageUrl: image,
        decision:
          recommendation.recommendation === "BUY_NOW"
            ? "purchased"
            : recommendation.recommendation === "WAIT"
              ? "delayed"
              : "resisted",
        delayHours: recommendation.delayHours,
        decisionMadeAt: new Date().toISOString(),
        questionsAnswered: answers,
        finalAction:
          recommendation.recommendation === "BUY_NOW"
            ? "smart_purchase"
            : recommendation.recommendation === "RESIST"
              ? "saved"
              : undefined,
        createdAt: new Date().toISOString(),
      };

      if (!SUPABASE_READY) {
        setState((prev) => ({
          ...prev,
          impulseLogs: [newLog, ...prev.impulseLogs],
          xpTransactions: [
            {
              id: crypto.randomUUID(),
              amount: xpReward,
              reason: `Impulse decision: ${itemName}`,
              relatedLogId: newLog.id,
              createdAt: new Date().toISOString(),
            },
            ...prev.xpTransactions,
          ],
        }));
        return;
      }

      const { data: insertedLog, error } = await supabase
        .from("impulse_logs")
        .insert({
          user_id: userId,
          item_name: itemName,
          item_price: itemPrice,
          item_image_url: image,
          category,
          decision: newLog.decision,
          delay_hours: recommendation.delayHours,
          decision_made_at: new Date().toISOString(),
          questions_answered: answers,
          final_action: newLog.finalAction,
        })
        .select("*")
        .single();

      if (error) {
        console.error("Failed to log impulse", error);
        return;
      }

      await supabase.from("xp_transactions").insert({
        user_id: userId,
        amount: xpReward,
        reason:
          recommendation.recommendation === "RESIST"
            ? `Resisted ${itemName}`
            : recommendation.recommendation === "WAIT"
              ? `Delay set for ${itemName}`
              : `Mindful purchase: ${itemName}`,
        related_log_id: insertedLog.id,
      });

      setState((prev) => ({
        ...prev,
        impulseLogs: [mapImpulseLog(insertedLog), ...prev.impulseLogs],
      }));
      await refresh();
    },
    [refresh, supabase, userId],
  );

  const value: AppDataContextValue = {
    ...state,
    refresh,
    logImpulse,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return ctx;
};
