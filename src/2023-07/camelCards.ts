import { prodInput } from "./input";

type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

const cardRanks: Record<Card, string> = {
  A: "14",
  K: "13",
  Q: "12",
  J: "11",
  T: "10",
  "9": "09",
  "8": "08",
  "7": "07",
  "6": "06",
  "5": "05",
  "4": "04",
  "3": "03",
  "2": "02",
};

const jokerRanks: Record<Card, string> = { ...cardRanks, J: "01" };

const getHandStrength = (asd: Partial<Record<Card, number>>) => {
  const values = Object.values(asd);
  const max = Math.max(...values);
  const len = values.length;
  // Five of a kind
  if (len === 1) return "21";
  // Four of a kind
  else if (max === 4) return "20";
  // Full house
  else if (len === 2 && max === 3) return "19";
  // Three of a kind
  else if (len === 3 && max === 3) return "18";
  // Two Pairs
  else if (len === 3 && max === 2) return "17";
  // Single Pair
  else if (len === 4 && max === 2) return "16";
  // All Unique
  else if (len === 5) return "15";
  console.warn("Detected no hand result");
  return "0";
};

const getHandScore = (cards: string, joker = false) => {
  const cardArray = Array.from(cards) as Card[];
  const partial: Partial<Record<Card, number>> = {};
  const score = cardArray.reduce((sum, card) => {
    partial[card] = 1 + (partial[card] ?? 0);
    return sum + cardRanks[card];
  }, "");

  const jPartial: Partial<Record<Card, number>> = {};
  let jCount = 0;
  const jScore = cardArray.reduce((sum, card) => {
    if (card !== "J") {
      jPartial[card] = 1 + (jPartial[card] ?? 0);
    } else {
      jCount++;
    }
    return sum + jokerRanks[card];
  }, "");

  const [biggest] = Object.entries(jPartial).sort((a, b) => b[1] - a[1])[0] || [
    "J",
  ];
  const big = biggest as Card;
  jPartial[big] = jCount + (jPartial[big] ?? 0);

  if (joker) return Number(getHandStrength(jPartial) + jScore);

  return Number(getHandStrength(partial) + score);
};

export const camelCards = () => {
  const hands = prodInput.split("\n");
  const rankedHands = hands.map((hand) => {
    const [cards, points] = hand.split(" ");
    return {
      score: getHandScore(cards),
      jScore: getHandScore(cards, true),
      points: Number(points),
      cards,
    };
  });

  // Part 1:
  rankedHands.sort((a, b) => a.score - b.score);
  const sum = rankedHands.reduce((s, h, i) => s + h.points * (i + 1), 0);
  console.log("Part 1:", sum);

  // Part 2:
  rankedHands.sort((a, b) => a.jScore - b.jScore);
  const sum2 = rankedHands.reduce((s, h, i) => sum + h.points * (i + 1), 0);
  console.log("Part 2:", sum2);
};
