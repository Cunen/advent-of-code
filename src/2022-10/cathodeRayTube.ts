import { prodInput } from "./input";

const crt: string[][] = [[], [], [], [], [], []];

const draw = (cycle: number, x: number) => {
  const row = Math.floor((cycle - 1 || 1) / 40);
  const index = cycle - 1 - row * 40;
  const shouldDraw = Math.abs(index - x) <= 1;
  crt[row].push(shouldDraw ? "#" : "-");
};

export const cathodeRayTube = () => {
  let x = 1;
  let i = 1;
  const cycleSums: number[] = [];
  const array = prodInput.split("\n");
  array.forEach((cmd, j) => {
    draw(i, x);
    if (cmd.startsWith("addx")) {
      draw(i + 1, x);
      const num = cmd.split(" ").at(1);
      x += Number(num);
      i += 2;
    } else i += 1;

    const next40 = (i + 21) % 40 === 0;
    const lookAhead = array[j + 1]?.startsWith("addx");
    const flat40 = (i + 20) % 40 === 0;

    if (flat40 || (next40 && lookAhead)) {
      cycleSums.push((next40 && lookAhead ? i + 1 : i) * x);
    }
  });

  // Part 1
  const sum = cycleSums.reduce((a, b) => a + b, 0);
  console.log("Part 1:", sum);

  // Part 2
  console.log("Part 2:");
  crt.forEach((row) => console.log(row.join("  ")));
};
