import { ImpulseAnswers, RecommendationResult } from "@/types";

interface DecisionInput {
  price: number;
  answers: ImpulseAnswers;
}

export const evaluateImpulseDecision = ({ price, answers }: DecisionInput): RecommendationResult => {
  const need = answers.need;
  const afford = answers.afford;
  const regret = answers.future;
  const similar = answers.similar;

  if (need === "Need" && afford === "Yes easily") {
    return {
      recommendation: "BUY_NOW",
      message: "This looks like an intentional purchase. Log it as a smart win.",
    };
  }

  if (price > 100 || regret === "Probably not") {
    return {
      recommendation: "WAIT",
      message: "Sleep on it for a bit. We'll remind you when the timer hits zero.",
      delayHours: price > 300 ? 24 : 12,
    };
  }

  if (similar === "Yes") {
    return {
      recommendation: "RESIST",
      message: "You already own something similar. Save the cash and earn XP instead!",
      xpReward: Math.round(price / 8),
    };
  }

  return {
    recommendation: "WAIT",
    message: "Give it at least 6 hours. Let the impulse cool down.",
    delayHours: 6,
  };
};
