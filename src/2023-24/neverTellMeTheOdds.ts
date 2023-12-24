import { findNumberValuesFromString, puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput, testInput } from "./input";

interface Hail {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

interface Intersection {
  x: number;
  y: number;
}

type Hails = Record<string, Hail>;

type Intersections = Record<string, Intersection>;

export const odds = () => {
  const hails: Hails = {};
  puzzleArray(prodInput).forEach((row) => {
    const [x, y, z, vx, vy, vz] = findNumberValuesFromString(row);
    const hail: Hail = {
      x,
      y,
      z,
      vx,
      vy,
      vz,
    };
    hails[xyToKey(x, y, z)] = hail;
    return hail;
  });

  console.log(Object.values(hails).length);

  const intersections: Intersections = {};
  for (const hail1 of Object.values(hails)) {
    for (const hail2 of Object.values(hails)) {
      const key1 = xyToKey(hail1.x, hail1.y, hail1.z);
      const key2 = xyToKey(hail2.x, hail2.y, hail2.z);
      const fullKey = hail1.x > hail2.x ? key1 + "&" + key2 : key2 + "&" + key1;
      if (key1 === key2 || intersections[fullKey]) continue;
      const x1 = hail1.x;
      const y1 = hail1.y;
      const x2 = hail1.x + hail1.vx;
      const y2 = hail1.y + hail1.vy;
      const x3 = hail2.x;
      const y3 = hail2.y;
      const x4 = hail2.x + hail2.vx;
      const y4 = hail2.y + hail2.vy;
      const divider = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      const s = x1 * y2 - y1 * x2;
      const e = x3 * y4 - y3 * x4;
      const x = (s * (x3 - x4) - (x1 - x2) * e) / divider;
      const y = (s * (y3 - y4) - (y1 - y2) * e) / divider;

      const a = hail1.vx >= 0 ? x < hail1.x : x > hail1.x;
      const b = hail1.vy >= 0 ? y < hail1.y : y > hail1.y;
      const c = hail2.vx >= 0 ? x < hail2.x : x > hail2.x;
      const d = hail2.vy >= 0 ? y < hail2.y : y > hail2.y;

      if (a || b || c || d) continue;

      intersections[fullKey] = { x, y };
    }
  }

  // 24615
  console.log(Object.values(intersections).length);

  const set = new Set(Object.keys(intersections));
  console.log(set.size);

  let p1 = 0;
  for (const { x, y } of Object.values(intersections)) {
    const low = 200000000000000;
    const high = 400000000000000;
    const xOK = x >= low && x <= high;
    const yOK = y >= low && y <= high;
    if (yOK && xOK) p1++;
  }

  console.log(intersections);

  // (22457) Too high
  // (14787) Too Low
  // Expecting (14799)
  console.log("Part 1:", p1);
};
