import { puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput, testInput } from "./input";

interface Intersection {
  key: string;
  x: number;
  y: number;
  paths: Record<string, number>;
  allpaths: Record<string, number>;
}

export const walk = () => {
  const matrix = puzzleArray(prodInput).map((row) => Array.from(row));

  const goalX = matrix[0].length - 2;
  const goalY = matrix.length - 1;
  const startKey = "1-0";
  const endKey = xyToKey(goalX, goalY);

  const getNext = (x: number, y: number, dir: string) => {
    x = x + (dir === "r" ? 1 : dir === "l" ? -1 : 0);
    y = y + (dir === "d" ? 1 : dir === "u" ? -1 : 0);
    if (!matrix[y] || !matrix[y][x]) return null;
    const poo = matrix[y][x];
    return poo === "#" ? null : poo;
  };

  const intersections = new Map<string, Intersection>();

  intersections.set(startKey, {
    key: startKey,
    x: 1,
    y: 0,
    paths: {},
    allpaths: {},
  });

  intersections.set(endKey, {
    x: goalX,
    y: goalY,
    key: endKey,
    paths: {},
    allpaths: {},
  });

  matrix.forEach((row, y) =>
    row.forEach((char, x) => {
      if (char !== ".") return;
      const nextR = getNext(x, y, "r");
      const nextL = getNext(x, y, "l");
      const nextU = getNext(x, y, "u");
      const nextD = getNext(x, y, "d");
      const intersection =
        Number(!!nextR) + Number(!!nextL) + Number(!!nextU) + Number(!!nextD) >
        2;
      if (intersection) {
        intersections.set(xyToKey(x, y), {
          x,
          y,
          key: xyToKey(x, y),
          paths: {},
          allpaths: {},
        });
      }
    })
  );

  const run = (
    k: string,
    x: number,
    y: number,
    dir = "",
    steps = 0,
    obstacles = false
  ) => {
    const oob = !matrix[y] || !matrix[y][x];
    const key = xyToKey(x, y);
    if (oob) return 0;

    const nextR = getNext(x, y, "r");
    const nextL = getNext(x, y, "l");
    const nextU = getNext(x, y, "u");
    const nextD = getNext(x, y, "d");

    if (intersections.has(key) && steps > 0) {
      intersections.get(k)!.allpaths[key] = steps;
      if (!obstacles) intersections.get(k)!.paths[key] = steps;
      return steps;
    }

    /* Part 1 Rules */
    const canGoR = dir !== "l" && nextR;
    const canGoL = dir !== "r" && nextL;
    const canGoU = dir !== "d" && nextU;
    const canGoD = dir !== "u" && nextD;

    let tacles = obstacles;
    if (dir === "l" && matrix[y][x] === ">") tacles = true;
    if (dir === "u" && matrix[y][x] === "v") tacles = true;

    // Go Right
    if (canGoR) run(k, x + 1, y, "r", steps + 1, tacles);
    // Go Left
    if (canGoL) run(k, x - 1, y, "l", steps + 1, tacles);
    // Go Down
    if (canGoD) run(k, x, y + 1, "d", steps + 1, tacles);
    // Go Up
    if (canGoU) run(k, x, y - 1, "u", steps + 1, tacles);
  };

  for (const [key, intersection] of intersections) {
    const { x, y } = intersection;
    run(key, x, y);
  }

  console.log(intersections);

  let longestPath = 0;
  const poop = (int: Intersection, sum = 0, visited = "") => {
    if (int.key === endKey) {
      if (sum > longestPath) {
        longestPath = sum;
        console.log(longestPath);
      }
      return;
    }

    if (visited.split("|").includes(int.key)) {
      return;
    }

    for (const [k, v] of Object.entries(int.paths)) {
      const i = intersections.get(k);
      if (i) {
        poop(intersections.get(k)!, sum + v, visited + "|" + int.key);
      }
    }
  };

  let longestPath2 = 0;
  const poop2 = (int: Intersection, sum = 0, visited = "") => {
    if (int.key === endKey) {
      if (sum > longestPath2) {
        longestPath2 = sum;
        console.log(longestPath2);
      }
      return;
    }

    if (visited.split("|").includes(int.key)) {
      return;
    }

    for (const [k, v] of Object.entries(int.allpaths)) {
      const i = intersections.get(k);
      if (i && !visited.includes(i.key)) {
        poop2(intersections.get(k)!, sum + v, visited + "|" + int.key);
      }
    }
  };

  poop(intersections.get(startKey)!);

  // Part 1 (2034)
  console.log("Part 1:", longestPath);

  poop2(intersections.get(startKey)!);

  // Part 2 (6302)
  console.log("Part 2:", longestPath2);
};
