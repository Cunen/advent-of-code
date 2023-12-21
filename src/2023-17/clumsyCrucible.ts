import { puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput, testInput } from "./input";

const findShortestPath = (matrix: number[][]) => {
  const visited: Record<string, number> = {};
  let lowestSoFar = Infinity;
  let counter = 0;
  const go = (x: number, y: number, sum: number, block: string): number[] => {
    counter++;
    if (counter % 100000000 === 0) {
      console.log(
        "Processed ",
        counter / 100000000,
        " 100mil ops",
        lowestSoFar
      );
    }
    const key = xyToKey(x, y);
    const outOfBounds = !matrix[y] || !matrix[y][x];
    const last3 = block.substring(0, 3);
    const backwards =
      last3 === "rlr" || last3 === "lrl" || last3 === "udu" || last3 === "dud";
    const tooFar =
      block === "rrrr" ||
      block === "llll" ||
      block === "uuuu" ||
      block === "dddd";
    const tooBig = sum > lowestSoFar || sum > 970;

    const expectedFactor = 4.25;
    const xyPrune = x + y > 10 && sum > (x + y) * expectedFactor;

    // Run Stopped
    if (outOfBounds || tooFar || tooBig || backwards || xyPrune) return [];
    // Run Complete
    const len = matrix.length - 1;
    if (x === len && y === len) {
      if (sum < lowestSoFar) lowestSoFar = sum;
      return [sum + matrix[y][x]];
    }

    // Do some prune-caching on visited paths
    const newSum = sum + matrix[y][x];
    const dirKey = block + key;
    const canContinue = newSum < (visited[dirKey] || Infinity);
    if (!canContinue) return [];
    visited[dirKey] = newSum;

    const right = go(x + 1, y, newSum, "r" + block.substring(0, 3));
    const down = go(x, y + 1, newSum, "d" + block.substring(0, 3));
    const left = go(x - 1, y, newSum, "l" + block.substring(0, 3));
    const up = go(x, y - 1, newSum, "u" + block.substring(0, 3));

    return [...right, ...left, ...down, ...up];
  };

  const arr = go(0, 0, -matrix[0][0], "---");
  const result = arr.at(-1) || 0;
  return result;
};

export const crucible = async () => {
  const array = puzzleArray(prodInput).map((row) =>
    Array.from(row).map(Number)
  );

  // (1016) too high
  // (1002) too high
  // (960) is wrong
  // (963) is correct
  console.log("Part 1:", findShortestPath(array));
};
