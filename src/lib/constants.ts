import { ImpulseQuestion } from "@/types";

export const CATEGORY_COLORS: Record<string, string> = {
  electronics: "from-blue-500 to-cyan-500",
  fashion: "from-pink-500 to-rose-500",
  food: "from-amber-500 to-orange-500",
  entertainment: "from-purple-500 to-indigo-500",
  wellness: "from-emerald-500 to-lime-500",
};

export const DECISION_COLORS: Record<string, string> = {
  resisted: "text-emerald-400",
  delayed: "text-amber-400",
  purchased: "text-rose-400",
};

export const QUESTION_BANK: ImpulseQuestion[] = [
  {
    id: "need",
    prompt: "Do you need this right now or just want it?",
    options: ["Need", "Want", "Not sure"],
    alwaysAsk: true,
  },
  {
    id: "future",
    prompt: "Will you still want this in 7 days?",
    options: ["Definitely", "Maybe", "Probably not"],
    alwaysAsk: true,
  },
  {
    id: "similar",
    prompt: "Do you already own something similar?",
    options: ["Yes", "No", "Sort of"],
    alwaysAsk: true,
  },
  {
    id: "afford",
    prompt: "Can you afford this without stress?",
    options: ["Yes easily", "Yes but tight", "No"],
    alwaysAsk: true,
  },
  {
    id: "compare",
    prompt: "Have you compared prices elsewhere?",
    options: ["Yes everywhere", "A little", "Not yet"],
    minPriceGate: 100,
  },
  {
    id: "plan",
    prompt: "Is this a planned purchase or impulse?",
    options: ["Planned", "Impulse", "Somewhat planned"],
    minPriceGate: 100,
  },
];

export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 1500, 2000, 3000, 4500];

export const DECISION_COPY = {
  BUY_NOW: {
    title: "Looks like a smart buy",
    message:
      "You have the budget and rationale. Log it as a mindful purchase to keep your streak going.",
  },
  WAIT: {
    title: "Hit pause for now",
    message:
      "Let the dopamine settle. We'll remind you when the timer runs out and you can decide with a clear head.",
  },
  RESIST: {
    title: "Victory unlocked",
    message:
      "You just saved future you a headache. Enjoy the XP boost and watch your streak glow hotter.",
  },
};
