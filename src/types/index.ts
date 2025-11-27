export type IncomeType = "pocket_money" | "salary" | "freelance";
export type CityTier = "tier1" | "tier2" | "tier3";
export type ImpulseDecision = "resisted" | "delayed" | "purchased";
export type DelayOption = 6 | 12 | 24 | 48;

export interface Profile {
  id: string;
  name: string;
  age: number;
  incomeType: IncomeType;
  monthlyIncome: number;
  monthlyExpenses: number;
  city: string;
  cityTier: CityTier;
  avatarUrl?: string;
  createdAt: string;
}

export interface ImpulseQuestion {
  id: string;
  prompt: string;
  options: string[];
  alwaysAsk?: boolean;
  minPriceGate?: number;
}

export interface ImpulseAnswers {
  [questionId: string]: string;
}

export interface ImpulseLog {
  id: string;
  itemName: string;
  itemPrice: number;
  itemImageUrl?: string;
  category: string;
  decision: ImpulseDecision;
  delayHours?: DelayOption;
  decisionMadeAt: string;
  questionsAnswered: ImpulseAnswers;
  finalAction?: string;
  createdAt: string;
}

export interface XPTransaction {
  id: string;
  amount: number;
  reason: string;
  relatedLogId?: string;
  createdAt: string;
}

export interface UserStats {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  totalSaved: number;
  totalSpentImpulse: number;
  impulsesResisted: number;
  impulsesPurchased: number;
  lastImpulseResistDate: string;
  shieldPoints: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  xpRequirement?: number;
  streakRequirement?: number;
  savingsRequirement?: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  earned?: boolean;
  earnedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  streak: number;
  avatarUrl?: string;
  rank: number;
}

export interface FriendRequest {
  id: string;
  name: string;
  xp: number;
  streak: number;
  status: "pending" | "accepted" | "rejected";
}

export interface RewardsProgress {
  nextLevelXp: number;
  xpToNextLevel: number;
  level: number;
}

export interface RecommendationResult {
  recommendation: "BUY_NOW" | "WAIT" | "RESIST";
  message: string;
  delayHours?: DelayOption;
  xpReward?: number;
}
