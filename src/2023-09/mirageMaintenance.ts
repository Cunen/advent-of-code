import { duplicateArray, findNumberValuesFromString, puzzleArray } from "../aoc/utils";
import { prodInput } from "./input";

/** [1,3,6] -> [2,3] */
const createArrayDiff = (array: number[]) => {
  return array
    .map((num, i) => (i === 0 ? null : num - array[i - 1]))
    .filter((n) => n !== null) as number[];
};

/** Extrapolate history forwards */
const extrapolate = (array: number[][]) =>
  array.reduce((sum, nums) => sum + (nums.at(-1) ?? 0), 0);

/** Extrapolate history backwards */
const revExtrapolate = (array: number[][]) =>
  array.reduce((sum, nums) => (nums.at(0) ?? 0) - sum, 0);

/** Create extrapolateable history from array of numbers */
const createHistory = (nums: number[]) => {
  const numHistory = [nums];
  nums.every(() => {
    const diffNumArray = createArrayDiff(numHistory[0]);
    numHistory.unshift(diffNumArray);
    return !duplicateArray(diffNumArray);
  });
  return numHistory;
};

export const mirage = () => {
  const array = puzzleArray(prodInput);
  const summary = array.reduce(
    (sum, line) => {
      const history = createHistory(findNumberValuesFromString(line));
      return {
        p1: sum.p1 + extrapolate(history),
        p2: sum.p2 + revExtrapolate(history),
      };
    },
    { p1: 0, p2: 0 }
  );

  // Part 1 (1853145119)
  console.log("Part 1:", summary.p1);

  // Part 2 (923)
  console.log("Part 2:", summary.p2);
};
