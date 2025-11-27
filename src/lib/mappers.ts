import { Badge, ImpulseLog, LeaderboardEntry, Profile, UserStats, XPTransaction } from "@/types";

const numberOrZero = (value: any) => (value === null || value === undefined ? 0 : Number(value));

export const mapProfile = (row: any): Profile => ({
  id: row?.id ?? "",
  name: row?.name ?? "Anonymous",
  age: row?.age ?? 0,
  incomeType: row?.income_type ?? "salary",
  monthlyIncome: numberOrZero(row?.monthly_income),
  monthlyExpenses: numberOrZero(row?.monthly_expenses),
  city: row?.city ?? "",
  cityTier: row?.city_tier ?? "tier1",
  avatarUrl: row?.avatar_url ?? undefined,
  createdAt: row?.created_at ?? new Date().toISOString(),
});

export const mapImpulseLog = (row: any): ImpulseLog => ({
  id: row?.id ?? crypto.randomUUID(),
  itemName: row?.item_name ?? row?.itemName ?? "",
  itemPrice: numberOrZero(row?.item_price ?? row?.itemPrice),
  itemImageUrl: row?.item_image_url ?? row?.itemImageUrl ?? undefined,
  category: row?.category ?? "other",
  decision: row?.decision ?? "delayed",
  delayHours: row?.delay_hours ?? row?.delayHours ?? undefined,
  decisionMadeAt: row?.decision_made_at ?? row?.decisionMadeAt ?? row?.created_at ?? new Date().toISOString(),
  questionsAnswered: row?.questions_answered ?? row?.questionsAnswered ?? {},
  finalAction: row?.final_action ?? row?.finalAction ?? undefined,
  createdAt: row?.created_at ?? new Date().toISOString(),
});

export const mapXpTransaction = (row: any): XPTransaction => ({
  id: row?.id ?? crypto.randomUUID(),
  amount: numberOrZero(row?.amount),
  reason: row?.reason ?? "",
  relatedLogId: row?.related_log_id ?? row?.relatedLogId ?? undefined,
  createdAt: row?.created_at ?? new Date().toISOString(),
});

export const mapBadge = (row: any): Badge => {
  const badgeRow = row?.badges ?? row;
  return {
    id: badgeRow?.id ?? row?.badge_id ?? crypto.randomUUID(),
    name: badgeRow?.name ?? "Badge",
    description: badgeRow?.description ?? "",
    iconUrl: badgeRow?.icon_url ?? undefined,
    xpRequirement: badgeRow?.xp_requirement ?? undefined,
    streakRequirement: badgeRow?.streak_requirement ?? undefined,
    savingsRequirement: badgeRow?.savings_requirement ?? undefined,
    tier: badgeRow?.tier ?? "bronze",
    earned: Boolean(row?.earned_at ?? row?.earned ?? badgeRow?.earned),
    earnedAt: row?.earned_at ?? badgeRow?.earned_at ?? undefined,
  };
};

export const mapLeaderboardEntry = (row: any, index = 0): LeaderboardEntry => ({
  id: row?.user_id ?? row?.id ?? crypto.randomUUID(),
  name: row?.name ?? row?.profiles?.name ?? "Anonymous",
  xp: numberOrZero(row?.total_xp ?? row?.xp),
  streak: numberOrZero(row?.current_streak ?? row?.streak),
  avatarUrl: row?.avatar_url ?? row?.profiles?.avatar_url ?? undefined,
  rank: row?.rank ?? index + 1,
});

export const mapUserStats = (row: any): UserStats => ({
  totalXp: numberOrZero(row?.total_xp),
  currentStreak: numberOrZero(row?.current_streak),
  longestStreak: numberOrZero(row?.longest_streak),
  totalSaved: numberOrZero(row?.total_saved),
  totalSpentImpulse: numberOrZero(row?.total_spent_impulse),
  impulsesResisted: numberOrZero(row?.impulses_resisted),
  impulsesPurchased: numberOrZero(row?.impulses_purchased),
  lastImpulseResistDate: row?.last_impulse_resist_date ?? new Date().toISOString(),
  shieldPoints: numberOrZero(row?.shield_points),
});
