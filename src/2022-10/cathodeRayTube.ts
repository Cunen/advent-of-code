import { prodInput } from "./input";

export const cathodeRayTube = () => {
  let x = 1;
  let i = 1;
  const cycleSums: number[] = [];
  const array = prodInput.split("\n");
  array.forEach((cmd, j) => {
    if (cmd.startsWith("addx")) {
      const num = cmd.split(" ").at(1);
      x += Number(num);
      i += 2;
    } else i += 1;

    const next40 = (i + 21) % 40 === 0;
    const lookAhead = array[j + 1]?.startsWith("addx");
    const flat40 = (i + 20) % 40 === 0;

    if (flat40 || (next40 && lookAhead)) {
      console.log(next40 && lookAhead ? i + 1 : i, x);
      cycleSums.push((next40 && lookAhead ? i + 1 : i) * x);
    }
  });

  // Part 1
  const sum = cycleSums.reduce((a, b) => a + b, 0);
  console.log("Part 1:", sum);
};
