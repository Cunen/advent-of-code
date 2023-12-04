import { prodInput } from "./input";

export const scratchcards = () => {
  const array = prodInput.split("\n");
  let totalPoints = 0;
  let totalCards = 0;
  const lookAhead = [0];
  array.forEach((card) => {
    const [, b] = card.split(":");
    const [first, second] = b.split("|");

    // const cardNum = Number(a.match(/[0-9]+/)?.at(0));
    const firstNums = (first.match(/[0-9]+/g) || []).map(Number);
    const secondNums = (second.match(/[0-9]+/g) || []).map(Number);

    let matchCount = 0;
    // Part 1 Points
    const points = firstNums.reduce((sum, num) => {
      const match = secondNums.includes(num);
      if (match) matchCount++;
      if (match && sum === 0) return 1;
      else if (match) return sum * 2;
      else return sum;
    }, 0);

    const repeats = (lookAhead.at(0) || 0) + 1;
    lookAhead.shift();

    totalCards += repeats;

    for (let i = 0; i < matchCount; i++) {
      if (!lookAhead[i]) {
        lookAhead[i] = repeats;
      } else {
        lookAhead[i] = lookAhead[i] + repeats;
      }
    }

    totalPoints += points;
  });

  console.log("Part 1:", totalPoints);

  console.log("Part 2", totalCards);
};
