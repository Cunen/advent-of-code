import { puzzleArray, rowsToColumns } from "../aoc/utils";
import { prodInput } from "./input";

const countRocks = (string: string) => {
  const length = string.length;
  const charArray = Array.from(string);
  return charArray.reduce((sum, char, i) => {
    if (char === "O") return sum + length - i;
    return sum;
  }, 0);
};

/** Rolls rocks in matrix West (left) */
const W = (matrix: string[], flip = false) => {
  matrix.forEach((row, y) => {
    const newRow = row
      .split("#")
      .map((section) => {
        const dots = section.match(/\./g) || [];
        const os = section.match(/O/g) || [];
        // Right
        if (flip) return dots.join("") + os.join("");
        // Left
        return os.join("") + dots.join("");
      })
      .join("#");
    matrix[y] = newRow;
  });
};

/** Rolls rocks in matrix North (up) */
const N = (matrix: string[], flip = false) => {
  const columns = rowsToColumns(matrix);
  columns.forEach((column, x) => {
    const newColumn = column
      .split("#")
      .map((section) => {
        const dots = section.match(/\./g) || [];
        const os = section.match(/O/g) || [];
        // Right
        if (flip) return dots.join("") + os.join("");
        // Left
        return os.join("") + dots.join("");
      })
      .join("#");
    columns[x] = newColumn;
  });
  const rows = rowsToColumns(columns);
  rows.forEach((r, i) => (matrix[i] = r));
};

/** Rolls rocks in matrix East (right) */
const E = (matrix: string[]) => W(matrix, true);

/** Rolls rocks in matrix South (down) */
const S = (matrix: string[]) => N(matrix, true);

const runCycle = (matrix: string[]) => {
  N(matrix);
  W(matrix);
  S(matrix);
  E(matrix);
};

export const parabolic = () => {
  // Part 1
  const matrix = puzzleArray(prodInput);
  N(matrix);
  const columns = rowsToColumns(matrix);
  const p1 = columns.map(countRocks).reduce((a, b) => a + b);
  // (108614)
  console.log("Part 1:", p1);

  // Run the rest of the cycle
  W(matrix);
  S(matrix);
  E(matrix);

  // Part 2
  const proceccedMatrixes = new Map<string, number>();
  const pastCycles = new Map<number, string>();
  let firstRepeat = 0;
  let repeatDist = 0;

  // Search for when the cycling starts a loop
  for (let i = 1; i < 1000; i++) {
    runCycle(matrix);
    const txt = matrix.join("X");
    if (proceccedMatrixes.has(txt)) {
      firstRepeat = proceccedMatrixes.get(txt)!;
      repeatDist = i - firstRepeat;
      break;
    }
    pastCycles.set(i, txt);
    proceccedMatrixes.set(txt, i);
  }

  // Calculate the position where the billionth cycle would have repeated from
  const targetCycles =
    ((1000000000 - firstRepeat) % repeatDist) + firstRepeat - 1;

  // Then count the cached position
  const cached = pastCycles.get(targetCycles)!;
  const cols = rowsToColumns(cached.split("X"));
  const p2 = cols.map(countRocks).reduce((a, b) => a + b);

  // (96447)
  console.log("Part 2:", p2);
};
