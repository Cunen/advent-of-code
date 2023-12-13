import { puzzleArray, rowsToColumns, strReplaceAt } from "../aoc/utils";
import { prodInput } from "./input";

const cache = new Map<string, number[]>();

const findPoints = (string: string) => {
  // Use caching
  if (cache.has(string)) return cache.get(string)!;
  const matches: number[] = [];
  const length = string.length;
  let reverseString = "";
  for (let i = 0; i < length; i++) {
    reverseString = string[i] + reverseString;
    const sub = string.substring(i + 1);
    const smallSub = sub.length <= reverseString.length;
    const subMatch = sub && smallSub && reverseString.startsWith(sub);
    const revMatch =
      reverseString && !smallSub && sub.startsWith(reverseString);
    if (subMatch || revMatch) matches.push(i + 1);
  }
  cache.set(string, matches);
  return matches;
};

const findMirrorPoint = (strings: string[], prev?: number) => {
  const record: Record<number, number> = {};
  const pointArray = strings.map(findPoints);
  const point: number[] = [];
  pointArray.forEach((array) =>
    array.forEach((num) => {
      if (!record[num]) record[num] = 1;
      else record[num]++;
      if (record[num] >= strings.length) point.push(num);
    })
  );
  const canUsePrev = prev !== undefined && point.length > 1;
  const isPrev = point[0] === prev;
  if (canUsePrev && isPrev) return point[1] || 0;
  return point[0] || 0;
};

const bruteMode = (rows: string[], i: number) => {
  let x = 0;
  let y = 0;

  const columns = rowsToColumns(rows);

  const height = rows.length;
  const width = rows[0].length;

  while (x < width && y < height) {
    const curChar = rows[y][x];
    const newChar = curChar === "#" ? "." : "#";

    rows[y] = strReplaceAt(rows[y], x, newChar);
    columns[x] = strReplaceAt(columns[x], y, newChar);

    const xPoint = findMirrorPoint(rows, found[i]);
    const yPoint = findMirrorPoint(columns, found[i] / 100) * 100;

    rows[y] = strReplaceAt(rows[y], x, curChar);
    columns[x] = strReplaceAt(columns[x], y, curChar);

    const foundX = xPoint > 0 && found[i] !== xPoint;
    const foundY = yPoint > 0 && found[i] !== yPoint;

    if (foundX) return xPoint;
    if (foundY) return yPoint;

    x++;
    if (x >= width) {
      x = 0;
      y++;
    }
  }
  return 0;
};

let found: Record<number, number> = {};

export const incidence = () => {
  const patterns = prodInput.split("\n\n").map(puzzleArray);
  found = {};
  const p1 = patterns.reduce((sum, rows, i) => {
    const columns = rowsToColumns(rows);
    const xPoint = findMirrorPoint(rows);
    const yPoint = findMirrorPoint(columns) * 100;
    if (xPoint > 0) found[i] = xPoint;
    if (yPoint > 0) found[i] = yPoint;
    return sum + xPoint + yPoint;
  }, 0);

  const p2 = patterns.map(bruteMode).reduce((a, b) => a + b);

  // Part 1 (29165)
  console.log("Part 1:", p1);

  // Part 2 (32192)
  console.log("Part 2:", p2);
};
