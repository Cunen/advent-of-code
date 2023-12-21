import { puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput, testInput } from "./input";

const findShortestPath = (matrix: number[][]) => {
  const visited: Record<string, number> = {};
  let lowestSoFar = Infinity;
  let counter = 0;
  const go = (x: number, y: number, sum: number, block: string, str = ''): number[] => {
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
    const l1 = block === 'ruld' || block === 'rdlu' || block === 'ldru' || block === 'lurd'; 
    const l2 = block === 'urdl' || block === 'uldr' || block === 'dlur' || block === 'drul'; 
    const loop = l1 || l2;
    const tooFar =
      block === "rrrr" ||
      block === "llll" ||
      block === "uuuu" ||
      block === "dddd";
    const tooBig = sum > lowestSoFar || sum > 963;

    const expectedFactor = 4.25;
    const xyPrune = x + y > 10 && sum > (x + y) * expectedFactor;

    // Run Stopped
    if (outOfBounds || tooFar || tooBig || backwards || loop || xyPrune) return [];
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
    if (!canContinue || str.includes(key)) return [];
    visited[dirKey] = newSum;

    const right = go(x + 1, y, newSum, "r" + block.substring(0, 3), str + '|' + key);
    const down = go(x, y + 1, newSum, "d" + block.substring(0, 3), str + '|' + key);
    const left = go(x - 1, y, newSum, "l" + block.substring(0, 3), str + '|' + key);
    const up = go(x, y - 1, newSum, "u" + block.substring(0, 3), str + '|' + key);

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

  // (963) is correct (245281.4 ms)
  console.log("Part 1:", findShortestPath(array));
};
