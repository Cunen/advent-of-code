import { puzzleArray, stringToArray } from "../aoc/utils";
import { prodInput } from "./input";

type Symbol = "S" | "-" | "|" | "L" | "F" | "7" | "J";

type Dir = "L" | "R" | "U" | "D";

interface Path {
  dir: Dir;
  symbol: Symbol;
  x: number;
  y: number;
}

const mapper: Record<string, Dir> = {
  "R-": "R",
  RJ: "U",
  R7: "D",
  "L-": "L",
  LF: "D",
  LL: "U",
  "U|": "U",
  UF: "R",
  U7: "L",
  "D|": "D",
  DL: "R",
  DJ: "L",
};

const paths: Record<string, Path> = {};

const insiders = new Set<string>();

const lookRight = (xPos: number, yPos: number) => {
  let xLoop = xPos + 1;
  while (!paths[`${xLoop}-${yPos}`] && xLoop <= 140) {
    insiders.add(`${xLoop}-${yPos}`);
    xLoop++;
  }
  if (xLoop >= 140) console.error("RIGHT OUT OF RANGE");
};
const lookLeft = (xPos: number, yPos: number) => {
  let xLoop = xPos - 1;
  while (!paths[`${xLoop}-${yPos}`] && xLoop >= 0) {
    insiders.add(`${xLoop}-${yPos}`);
    xLoop--;
  }
  if (xLoop <= 0) console.error("LEFT OUT OF RANGE");
};
const lookUp = (xPos: number, yPos: number) => {
  let yLoop = yPos - 1;
  while (!paths[`${xPos}-${yLoop}`] && yLoop >= 0) {
    insiders.add(`${xPos}-${yLoop}`);
    yLoop--;
  }
  if (yLoop <= 0) console.error("UP OUT OF RANGE");
};
const lookDown = (xPos: number, yPos: number) => {
  let yLoop = yPos + 1;
  while (!paths[`${xPos}-${yLoop}`] && yLoop <= 140) {
    insiders.add(`${xPos}-${yLoop}`);
    yLoop++;
  }
  if (yLoop >= 140) console.error("DOWN OUT OF RANGE");
};
const generateInsiders = () => {
  Object.entries(paths).forEach(([key, path]) => {
    const { symbol, dir, x, y } = path;
    if (symbol === "|" && dir === "D") lookLeft(x, y);
    if (symbol === "|" && dir === "U") lookRight(x, y);

    if (symbol === "-" && dir === "L") lookUp(x, y);
    if (symbol === "-" && dir === "R") lookDown(x, y);

    if (symbol === "F" && dir === "R") {
      lookRight(x, y);
      lookDown(x, y);
    }
    if (symbol === "F" && dir === "D") {
      lookLeft(x, y);
      lookUp(x, y);
    }

    if (symbol === "J" && dir === "L") {
      lookLeft(x, y);
      lookUp(x, y);
    }
    if (symbol === "J" && dir === "U") {
      lookRight(x, y);
      lookDown(x, y);
    }

    if (symbol === "L" && dir === "R") {
      lookLeft(x, y);
      lookDown(x, y);
    }
    if (symbol === "L" && dir === "U") {
      lookRight(x, y);
      lookUp(x, y);
    }

    if (symbol === "7" && dir === "L") {
      lookRight(x, y);
      lookUp(x, y);
    }
    if (symbol === "7" && dir === "D") {
      lookLeft(x, y);
      lookDown(x, y);
    }
  });
};

export const pipeMaze = () => {
  const rows = puzzleArray(prodInput).map(stringToArray);

  let steps = 1;
  let y = rows.findIndex((r) => r.includes("S"));
  let x = rows[y].indexOf("S");
  // Remember to also mark the starting point S as part of the pipe
  paths[`${x}-${y}`] = { x, y, dir: "R", symbol: "-" };
  x++;
  let dir: Dir = "R";

  while (rows[y][x] !== "S") {
    paths[`${x}-${y}`] = { x, y, dir, symbol: rows[y][x] as Symbol };
    if (dir === "R") x++;
    else if (dir === "L") x--;
    else if (dir === "U") y--;
    else if (dir === "D") y++;
    const sym = rows[y][x];
    dir = mapper[dir + sym];
    steps++;
  }

  // Part 1 (7012)
  console.log("Part 1:", steps / 2);

  generateInsiders();

  // Part 2 (395)
  console.log("Part 2:", insiders.size);
};
