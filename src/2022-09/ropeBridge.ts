import { prodInput } from "./input";

interface Point {
  x: number;
  y: number;
}

const tooFar = (a: Point, b: Point) => {
  const xTooFar = Math.abs(a.x - b.x) > 1;
  const yTooFar = Math.abs(a.y - b.y) > 1;
  return xTooFar || yTooFar;
};

const tailWhip = (head: Point, tail: Point) => {
  const xDiff = head.x - tail.x;
  const yDiff = head.y - tail.y;
  const xMod = xDiff === 0 ? 0 : xDiff > 0 ? 1 : -1;
  const yMod = yDiff === 0 ? 0 : yDiff > 0 ? 1 : -1;
  return {
    x: tail.x + xMod,
    y: tail.y + yMod,
  };
};

export const ropeBridge = () => {
  const movements = prodInput.split("\n");
  const tailVisits: Record<string, boolean> = { "0-0": true };
  const firstKnotVisits: Record<string, boolean> = { "0-0": true };
  const tails: Point[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  const head: Point = { x: 0, y: 0 };
  movements.forEach((move) => {
    const [dir, amount] = move.split(" ");
    const xAdd = dir === "R" ? 1 : dir === "L" ? -1 : 0;
    const yAdd = dir === "U" ? 1 : dir === "D" ? -1 : 0;
    for (let i = 0; i < Number(amount); i++) {
      const [newX, newY] = [head.x + xAdd, head.y + yAdd];
      head.x = newX;
      head.y = newY;

      let prevTail = head;
      tails.forEach((tail) => {
        if (tooFar(prevTail, tail)) {
          const { x, y } = tailWhip(prevTail, tail);
          tail.x = x;
          tail.y = y;
        }
        prevTail = tail;
      });

      const firstKnot = tails.at(0);
      if (firstKnot) {
        firstKnotVisits[`${firstKnot.x}-${firstKnot.y}`] = true;
      }

      const lastTail = tails.at(-1);
      if (lastTail) {
        tailVisits[`${lastTail.x}-${lastTail.y}`] = true;
      }
    }
  });

  // Part 1
  console.log("Part 1:", Object.keys(firstKnotVisits).length);

  // Part 2
  console.log("Part 2:", Object.keys(tailVisits).length);
};
