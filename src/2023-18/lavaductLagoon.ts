import { puzzleArray } from "../aoc/utils";
import { prodInput } from "./input";

export const lavaduct = async () => {
  const array = puzzleArray(prodInput).map((row) => {
    const [dir, count, hex] = row.split(" ");
    const hCount = parseInt(hex.substring(2, 7), 16);
    const hDir = ["R", "D", "L", "U"][Number(hex.substring(7, 8))];
    return { dir, count: Number(count), hCount, hDir };
  });

  let [xa1, xa2, ya1, ya2] = [0, 0, 0, 0];
  let [xb1, xb2, yb1, yb2] = [0, 0, 0, 0];
  const summary = array.reduce(
    (sum, { dir, hDir, count, hCount }) => {
      xa2 = xa2 + (dir === "R" ? count : dir === "L" ? -count : 0);
      ya2 = ya2 + (dir === "D" ? count : dir === "U" ? -count : 0);
      xb2 = xb2 + (hDir === "R" ? hCount : hDir === "L" ? -hCount : 0);
      yb2 = yb2 + (hDir === "D" ? hCount : hDir === "U" ? -hCount : 0);
      const aVertex = xa1 * ya2 - xa2 * ya1;
      const bVertex = xb1 * yb2 - xb2 * yb1;
      [ya1, xa1, yb1, xb1] = [ya2, xa2, yb2, xb2];
      return { p1: count + sum.p1 + aVertex, p2: hCount + sum.p2 + bVertex };
    },
    { p1: 0, p2: 0 }
  );

  // (28911)
  console.log("Part 1:", summary.p1 / 2 + 1);
  // (77366737561114)
  console.log("Part 2:", summary.p2 / 2 + 1);
};
