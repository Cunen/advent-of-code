import { findNumberValuesFromString, puzzleArray } from "../aoc/utils";
import { prodInput, testInput } from "./input";

export const hotspring = () => {
  const inputArray = puzzleArray(prodInput);

  const p1 = inputArray.reduce((total, row, i) => {
    const [a, b] = row.split(" ");

    const numbers = findNumberValuesFromString(b);

    const width = a.length;
    const sum = numbers.reduce((a, b) => a + b);
    const defaultGaps = numbers.length - 1;
    const freeGaps = width - sum - defaultGaps;

    const numRay: number[] = new Array(numbers.length - 1).fill(1);
    let fillArrays: number[][] = [[0, ...numRay, 0]];

    for (let i = 0; i < freeGaps; i++) {
      let newArrays: number[][] = [];
      fillArrays.forEach((fillArray) => {
        fillArray.forEach((num, i) => {
          const clone = [...fillArray];
          clone[i]++;
          newArrays.push(clone);
        });
      });
      fillArrays = newArrays;
    }

    let possibilities = fillArrays
      .map((fillArray) => {
        const str = fillArray.reduce((sum, fill, i) => {
          const num = numbers.at(i);
          const add = ".".repeat(fill) + (num ? "#".repeat(num) : "");
          return sum + add;
        }, "");

        const invalid = Array.from(str).some((s, i) => {
          const hash = s === "#";
          const targetDot = a[i] === ".";
          const targetHash = a[i] === "#";
          return (hash && targetDot) || (!hash && targetHash);
        });

        if (invalid) return "";

        return str;
      })
      .filter(Boolean);

    const set = new Set(possibilities);
    possibilities = Array.from(set);

    return total + possibilities.length;
  }, 0);

  // Part 1 (7599)
  console.log("Part 1:", p1);
};
