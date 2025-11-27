import { LEVEL_THRESHOLDS } from "./constants";

export const formatCurrency = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);

export const calculateLevel = (xp: number) => {
  let level = 1;
  let nextLevelXp = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  let currentLevelBase = 0;

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      currentLevelBase = LEVEL_THRESHOLDS[i];
    } else {
      nextLevelXp = LEVEL_THRESHOLDS[i];
      break;
    }
  }

  return {
    level,
    currentLevelBase,
    nextLevelXp,
    xpToNextLevel: Math.max(nextLevelXp - xp, 0),
  };
};
