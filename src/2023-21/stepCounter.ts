import { puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput, testInput } from "./input";

const move = (
  matrix: string[][],
  map: Map<string, { x: number; y: number }>,
  x: number,
  y: number
) => {
  const width = matrix[0].length;
  const height = matrix.length;
  const divY = y % height;
  const divX = x % width;
  const relY = y < 0 ? (!divY ? 0 : width + divY) : divY;
  const relX = x < 0 ? (!divX ? 0 : width + divX) : divX;
  // UP
  const upY = y - 1;
  const divU = upY % height;
  const relativeU = upY < 0 ? (!divU ? 0 : height + divU) : divU;
  if (
    matrix[relativeU] &&
    matrix[relativeU][relX] &&
    matrix[relativeU][relX] === "."
  ) {
    map.set(xyToKey(upY, x), { x, y: upY });
  }
  // DOWN
  const downY = y + 1;
  const divD = downY % height;
  const relativeD = downY < 0 ? (!divD ? 0 : height + divD) : divD;
  if (
    matrix[relativeD] &&
    matrix[relativeD][relX] &&
    matrix[relativeD][relX] === "."
  ) {
    map.set(xyToKey(downY, x), { x, y: downY });
  }
  // LEFT
  const leftX = x - 1;
  const divL = leftX % width;
  const relativeL = leftX < 0 ? (!divL ? 0 : width + divL) : divL;
  if (
    matrix[relY] &&
    matrix[relY][relativeL] &&
    matrix[relY][relativeL] === "."
  ) {
    map.set(xyToKey(y, leftX), { x: leftX, y });
  }
  // RIGHT
  const rightX = x + 1;
  const divR = rightX % width;
  const relativeR = rightX < 0 ? (!divR ? 0 : width + divR) : divR;
  if (
    matrix[relY] &&
    matrix[relY][relativeR] &&
    matrix[relY][relativeR] === "."
  ) {
    map.set(xyToKey(y, rightX), { x: rightX, y });
  }
};

export const step = async () => {
  let startX = 0;
  let startY = 0;
  const matrix = puzzleArray(prodInput).map((r, i) => {
    const start = r.indexOf("S");
    if (start >= 0) {
      startX = start;
      startY = i;
    }
    return Array.from(r);
  });

  // Set start point S as a plot
  matrix[startY][startX] = ".";

  const height = matrix.length;
  const half = Math.floor(height / 2);

  let map = new Map<string, { x: number; y: number }>();
  map.set(xyToKey(startX, startY), { x: startX, y: startY });

  const quadValues = [];
  // Set these to 0 if you change the puzzle input
  const a = 3699;
  const b = 14750;
  const c = 14688;
  // https://www.wolframalpha.com/input?i=quadratic+fit+calculator&assumption=%7B%22F%22%2C+%22QuadraticFitCalculator%22%2C+%22data3x%22%7D+-%3E%22%7B0%2C1%2C2%7D%22&assumption=%7B%22F%22%2C+%22QuadraticFitCalculator%22%2C+%22data3y%22%7D+-%3E%22%7B0%2C1%2C2%7D%22
  const quad = (x: number) => {
    return a + b * x + c * x * x;
  };

  // Stepper
  for (let i = 0; i < 330; i++) {
    const newMap = new Map<string, { x: number; y: number }>();
    for (const [, v] of map) move(matrix, newMap, v.x, v.y);
    // Part 1
    if (i === 63) {
      console.log("Part 1", newMap.size);
      if (a && b && c) break;
    }
    if (i === half - 1) quadValues.push(newMap.size);
    if (i === half - 1 + height) quadValues.push(newMap.size);
    if (i === half - 1 + height + height) quadValues.push(newMap.size);
    map = newMap;
  }

  console.log(
    "You must fill the values of",
    quadValues.join(", "),
    "into https://www.wolframalpha.com/input?i=quadratic+fit+calculator&assumption=%7B%22F%22%2C+%22QuadraticFitCalculator%22%2C+%22data3x%22%7D+-%3E%22%7B0%2C1%2C2%7D%22&assumption=%7B%22F%22%2C+%22QuadraticFitCalculator%22%2C+%22data3y%22%7D+-%3E%22%7B0%2C1%2C2%7D%22"
  );
  console.log(
    "Then you must fill the respective numbers from the calculation to a, b, and c variables"
  );

  const targetSteps = (26501365 - half) / height;
  console.log("Part 2:", quad(targetSteps));
};
