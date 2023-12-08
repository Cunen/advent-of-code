import { arrayLcm } from "../aoc/utils";
import { prodInput } from "./input";

interface Dir {
  R: string;
  L: string;
}

const directions: Record<string, Dir> = {};

export const wasteland = () => {
  const inputArray = prodInput.split("\n");

  const instructions = Array.from(inputArray[0]) as ("L" | "R")[];

  inputArray.shift();
  inputArray.shift();

  inputArray.forEach((branch) => {
    const [dir, L, R] = branch.match(/[A-Z]+/g) || [""];
    directions[dir] = { L, R };
  });

  let steps = 0;
  let current = "AAA";
  let i = 0;
  while (current !== "ZZZ") {
    if (i >= instructions.length) i = 0;
    const next = directions[current][instructions[i]];
    current = next;
    i += 1;
    steps += 1;
  }

  // Part 1
  console.log("Part 1", steps);

  let startPoints = inputArray
    .filter((a) => a[2] === "A")
    .map((a) => a.substring(0, 3));

  const shortestPaths = startPoints.map((start) => {
    let steps = 0;
    let current = start;
    let i = 0;
    while (current[2] !== "Z") {
      if (i >= instructions.length) i = 0;
      const next = directions[current][instructions[i]];
      current = next;

      i += 1;
      steps += 1;
    }
    return steps;
  });

  const leastCommonMultiplier = arrayLcm(shortestPaths);

  console.log("Part 2", leastCommonMultiplier);
};
