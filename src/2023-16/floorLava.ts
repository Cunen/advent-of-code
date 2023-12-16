import { puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput } from "./input";

type Dir = "R" | "L" | "U" | "D";

const guide: Record<string, Dir[]> = {
  "R.": ["R"],
  "R-": ["R"],
  "R/": ["U"],
  "R\\": ["D"],
  "R|": ["U", "D"],
  "L.": ["L"],
  "L-": ["L"],
  "L/": ["D"],
  "L\\": ["U"],
  "L|": ["U", "D"],
  "U.": ["U"],
  "U-": ["L", "R"],
  "U/": ["R"],
  "U\\": ["L"],
  "U|": ["U"],
  "D.": ["D"],
  "D-": ["L", "R"],
  "D/": ["L"],
  "D\\": ["R"],
  "D|": ["D"],
};

const bounceLight = (a: string[][], x = 0, y = 0, dir: Dir = "R") => {
  const setA = new Set<string>();
  const setB = new Set<string>();
  const traverse = (x = 0, y = 0, dir: Dir = "R"): void => {
    const outOfRange = !a[y] || !a[y][x];
    const key = xyToKey(x, y) + dir;
    const visited = setA.has(key);

    // Break loop
    if (outOfRange || visited) return;

    const char = a[y][x];
    const next = guide[dir + char];
    setA.add(key);
    setB.add(xyToKey(x, y));

    for (const n of next) {
      const newX = x + (n === "R" ? 1 : n === "L" ? -1 : 0);
      const newY = y + (n === "D" ? 1 : n === "U" ? -1 : 0);
      traverse(newX, newY, n);
    }
  };
  traverse(x, y, dir);
  return setB.size;
};

const bounceLights = (a: string[][]) => {
  const width = a[0].length;
  const height = a.length;

  const verticals = a[0].flatMap((_, i) => {
    return [bounceLight(a, i, 0, "D"), bounceLight(a, i, height - 1, "U")];
  });

  const horizontals = a.flatMap((_, i) => {
    return [bounceLight(a, 0, i, "R"), bounceLight(a, width - 1, i, "L")];
  });

  return Math.max(...verticals, ...horizontals);
};

export const floorLava = async () => {
  const array = puzzleArray(prodInput).map((a) => Array.from(a));

  // Part 1 (7543)
  console.log("Part 1:", bounceLight(array));

  // Part 2 (8231)
  console.log("Part 2:", bounceLights(array));
};
