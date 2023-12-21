import { puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput, testInput } from "./input";

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
  matrix[startY][startX] = '.';

  let map = new Map<string, { x: number; y: number }>();
  map.set(xyToKey(startX, startY), { x: startX, y: startY });

  // Stepper
  for (let i = 0; i < 64; i++) {
    const newMap = new Map<string, { x: number; y: number }>();
    for (const [k, v] of map) {
      const { x, y } = v;
      // UP
      const upY = y - 1;
      if (matrix[upY] && matrix[upY][x] && matrix[upY][x] === ".") {
        newMap.set(xyToKey(upY, x), { x, y: upY });
      }
      // DOWN
      const downY = y + 1;
      if (matrix[downY] && matrix[downY][x] && matrix[downY][x] === ".") {
        newMap.set(xyToKey(downY, x), { x, y: downY });
      }
      // LEFT
      const leftX = x - 1;
      if (matrix[y] && matrix[y][leftX] && matrix[y][leftX] === ".") {
        newMap.set(xyToKey(y, leftX), { x: leftX, y });
      }
      // RIGHT
      const rightX = x + 1;
      if (matrix[y] && matrix[y][rightX] && matrix[y][rightX] === ".") {
        newMap.set(xyToKey(y, rightX), { x: rightX, y });
      }
    }
    map = newMap;
  }

  // (3637)
  console.log("Part 1", map);
};
