import { prodInput, prodMoves } from "./input";

export const supplyStacks = () => {
  const moves = prodMoves.split("\n");
  const containers = prodInput.split("\n");
  const stacksA: string[][] = [[], [], [], [], [], [], [], [], []];
  const stacksB: string[][] = [[], [], [], [], [], [], [], [], []];

  containers.forEach((row) => {
    for (let j = 1; j < (containers.at(0) ?? "").length; j += 4) {
      const value = row.at(j)?.trim();
      if (value && !value.match(/[0-9]+/)) {
        const index = (j - 1) / 4;
        stacksA[index].push(value);
        stacksB[index].push(value);
      }
    }
  });

  moves.forEach((move, i) => {
    const str = move
      .replace("move ", "")
      .replace("from ", "")
      .replace("to ", "");
    const [count, from, to] = str.split(" ");
    const c = Number(count);
    const f = Number(from) - 1;
    const t = Number(to) - 1;
    // Part 1
    const spliced = stacksA[f].splice(0, c);
    spliced.reverse();
    stacksA[t].unshift(...spliced);
    // Part 2
    const spliced2 = stacksB[f].splice(0, c);
    stacksB[t].unshift(...spliced2);
  });

  // Part 1
  const message = stacksA.map((stack) => stack.at(0) ?? "").join("");
  console.log("Part 1:", message);

  // Part 2
  const message2 = stacksB.map((stack) => stack.at(0) ?? "").join("");
  console.log("Part 2:", message2);
};
