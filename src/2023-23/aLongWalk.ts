import { puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput, testInput } from "./input";

export const walk = () => {
  const matrix = puzzleArray(prodInput).map((row) => Array.from(row));

  const getNext = (x: number, y: number, dir: string) => {
    x = x + (dir === "r" ? 1 : dir === "l" ? -1 : 0);
    y = y + (dir === "d" ? 1 : dir === "u" ? -1 : 0);
    if (!matrix[y] || !matrix[y][x]) return null;
    else return matrix[y][x];
  };

  const goalX = matrix[0].length - 2;
  const goalY = matrix.length - 1;

  let longestPath = 0;
  const run = (x: number, y: number, dir = "d", steps = 0, inter = "S|") => {
    const oob = !matrix[y] || !matrix[y][x];
    const key = xyToKey(x, y);
    if (oob) return 0;

    const nextR = getNext(x, y, "r");
    const nextL = getNext(x, y, "l");
    const nextU = getNext(x, y, "u");
    const nextD = getNext(x, y, "d");

    if (x === goalX && y === goalY) {
      if (steps > longestPath) longestPath = steps;
      return steps;
    }

    /* Part 1 Rules */
    const canGoR = dir !== "l" && (nextR === "." || nextR === ">");
    const canGoL = dir !== "r" && nextL === ".";
    const canGoU = dir !== "d" && nextU === ".";
    const canGoD = dir !== "u" && (nextD === "." || nextD === "v");

    const intersection =
      Number(canGoR) + Number(canGoL) + Number(canGoU) + Number(canGoD) > 1;
    if (intersection) {
      inter = key + "|" + inter;
    }

    // Go Right
    if (canGoR) run(x + 1, y, "r", steps + 1, inter);
    // Go Left
    if (canGoL) run(x - 1, y, "l", steps + 1, inter);
    // Go Down
    if (canGoD) run(x, y + 1, "d", steps + 1, inter);
    // Go Up
    if (canGoU) run(x, y - 1, "u", steps + 1, inter);
  };
  run(1, 0);

  let longestPath2 = 0;
  const run2 = (x: number, y: number, dir = "d", steps = 0, inter = "") => {
    const oob = !matrix[y] || !matrix[y][x];
    const key = xyToKey(x, y);
    if (oob) return 0;

    const nextR = getNext(x, y, "r");
    const nextL = getNext(x, y, "l");
    const nextU = getNext(x, y, "u");
    const nextD = getNext(x, y, "d");

    if (x === goalX && y === goalY) {
      console.log("Goal");
      if (steps > longestPath) longestPath2 = steps;
      return steps;
    }

    // Part 2 Rules
    const canGoR = dir !== "l" && nextR && nextR !== "#";
    const canGoL = dir !== "r" && nextL && nextL !== "#";
    const canGoU = dir !== "d" && nextU && nextU !== "#";
    const canGoD = dir !== "u" && nextD && nextD !== "#";

    if (inter.split("|").indexOf(key) !== -1) {
      console.log("Already been here");
      return 0;
    }
    const intersection =
      Number(canGoR) + Number(canGoL) + Number(canGoU) + Number(canGoD) > 1;
    if (intersection) {
      inter = key + "|" + inter;
      console.log(key);
    }

    // Go Right
    if (canGoR) run(x + 1, y, "r", steps + 1, inter);
    // Go Left
    if (canGoL) run(x - 1, y, "l", steps + 1, inter);
    // Go Down
    if (canGoD) run(x, y + 1, "d", steps + 1, inter);
    // Go Up
    if (canGoU) run(x, y - 1, "u", steps + 1, inter);
  };
  // run2(1, 0);

  // Part 1 (2034)
  console.log("Part 1:", longestPath);
};
