import { count } from "console";
import { findNumberValuesFromString, puzzleArray, xyToKey } from "../aoc/utils";
import { prodInput, testInput } from "./input";

interface Brick {
  key: string;
  width: number; // X
  length: number; // Y
  height: number; // Z
  x: number;
  y: number;
  z: number;
  volume: number;
  restsOn: Brick[];
  supports: Brick[];
}

type Bricks = Record<string, Brick>;

const getBricks = () => {
  const bricks: Bricks = {};
  const sortedArray = puzzleArray(prodInput);
  sortedArray.sort((a, b) => {
    return findNumberValuesFromString(a)[2] - findNumberValuesFromString(b)[2];
  });
  for (const row of sortedArray) {
    const [a, b] = row.split("~");
    const [x, y, z] = a.split(",").map(Number);
    const [x2, y2, z2] = b.split(",").map(Number);
    const width = x2 - x + 1;
    const length = y2 - y + 1;
    const height = z2 - z + 1;
    const volume = width * height * length;
    const key = xyToKey(x, y, z);
    const brick: Brick = {
      key,
      width,
      length,
      height,
      x,
      y,
      z,
      volume,
      restsOn: [],
      supports: [],
    };
    bricks[key] = brick;
  }
  return bricks;
};

const addFloors = (tower: string[][][], count = 1) => {
  for (let i = 0; i < count; i++) {
    const floor = "-.........."
      .repeat(10)
      .substring(1)
      .split("-")
      .map((r) => Array.from(r));
    tower.push(floor);
  }
};

const addBrickToTower = (
  floorNum: number,
  tower: string[][][],
  brick: Brick
) => {
  for (let z = 0; z < brick.height; z++) {
    const zKey = z + floorNum;
    if (!tower[zKey]) addFloors(tower);
    for (let x = brick.x; x < brick.width + brick.x; x++) {
      for (let y = brick.y; y < brick.length + brick.y; y++) {
        tower[zKey][y][x] = brick.key;
      }
    }
  }
};

const letTheBricksFall = (bricks: Bricks) => {
  const tower: string[][][] = [];
  addFloors(tower);
  for (const brick of Object.values(bricks)) {
    const collisions = new Set<string>();
    let topFloor = tower.length - 1;
    // Check XY Collisions
    for (let z = topFloor; z >= 0; z--) {
      // Check Collision On Current Floor
      for (let x = brick.x; x < brick.width + brick.x; x++) {
        for (let y = brick.y; y < brick.length + brick.y; y++) {
          if (tower[z][y][x] !== ".") {
            collisions.add(tower[z][y][x]);
          }
        }
      }
      // Collision Found, Add Slab To Tower
      if (collisions.size) {
        for (const col of collisions) {
          brick.restsOn.push(bricks[col]);
          bricks[col].supports.push(brick);
        }
        addBrickToTower(z + 1, tower, brick);
        break;
      }
      // Reached Bottom, Add Slab To Tower
      else if (z === 0) {
        addBrickToTower(0, tower, brick);
        break;
      }
    }
  }
};

const getEssentialKeys = (bricks: Bricks) => {
  const essentials = new Set<string>();
  for (const brick of Object.values(bricks)) {
    // If the brick lays on only a single block, it is essential
    if (brick.restsOn.length === 1) essentials.add(brick.restsOn[0].key);
  }
  return essentials;
};

const removeBricksOneByOne = (bricks: Bricks, essentials: Set<string>) => {
  let count = 0;
  for (const key of essentials) {
    const fallen = new Set<string>();
    const drop = (bs: Brick[], sum = 0): number => {
      const potential = new Set<string>();
      // Mark bricks as fallen
      for (const b of bs) {
        for (const support of b.supports) potential.add(support.key);
        fallen.add(b.key);
      }
      const next: Brick[] = [];
      // Find bricks that fill fall next
      for (const pot of potential) {
        const br = bricks[pot];
        // If all support bricks have falled, next one will fall too.
        if (br.restsOn.every((rest) => fallen.has(rest.key))) next.push(br);
      }
      if (next.length > 0) return drop(next, next.length + sum);
      return sum;
    };
    // Count bricks that fell for each essential brick
    const bricksThatFell = drop([bricks[key]]);
    count += bricksThatFell;
  }
  return count;
};

export const slabs = () => {
  const start = performance.now();

  const bricks = getBricks();
  letTheBricksFall(bricks);

  // These bricks cannot be removed
  const essentials = getEssentialKeys(bricks);

  const end = performance.now();

  // Part 1 (405)
  console.log(
    "Part 1",
    Object.values(bricks).length - essentials.size,
    (end - start).toFixed(1),
    "ms"
  );

  const fallenBricks = removeBricksOneByOne(bricks, essentials);

  const end2 = performance.now();

  // Part 2 (61297)
  console.log("Part 2:", fallenBricks, (end2 - end).toFixed(1), "ms");
  console.log("Total:", (end2 - start).toFixed(1), "ms");
};
