import { prodInput } from "./input";

const charToScore = (c: string) => {
  const p = c.charCodeAt(0) - 96;
  return p < 0 ? p + 58 : p;
};

export const organizeRucksack = () => {
  const sacks = prodInput.split("\n");
  const scored = sacks.map((chars, i) => {
    const charArray = Array.from(chars);
    const pointsArray = charArray.map(charToScore);
    const len = charArray.length / 2;

    const pointsArrayFirstHalf = pointsArray.slice(0, len);
    const pointsArraySecondHalf = pointsArray.slice(len);

    const scoreIntersection =
      pointsArrayFirstHalf
        .filter((n) => pointsArraySecondHalf.includes(n))
        .at(0) ?? 0;

    let badgeScore = 0;
    if ((i + 1) % 3 === 0) {
      const elf1 = Array.from(sacks[i - 2]);
      const elf2 = Array.from(sacks[i - 1]);
      const elf3 = Array.from(sacks[i]);
      const first = elf1.filter((n) => elf2.includes(n));
      const badge = first.filter((n) => elf3.includes(n)).at(0);
      if (badge) badgeScore = charToScore(badge);
    }

    return {
      pointsArray,
      charArray,
      pointsArrayFirstHalf,
      pointsArraySecondHalf,
      scoreIntersection,
      badgeScore,
    };
  });

  const summary = { total: 0, badge: 0 };

  const sum = scored.reduce((a, b) => {
    return {
      total: a.total + b.scoreIntersection,
      badge: a.badge + b.badgeScore,
    };
  }, summary);

  // Part 1
  console.log("Part 1:", sum.total);

  // Part 2
  console.log("Part 2:", sum.badge);
};
