import { prodInput } from "./input";

const reducer = (game: string, color: string) => {
  const regex = new RegExp(`\\b(\\d+)\\s+${color}\\b`, "g");
  return (
    game.match(regex)?.reduce((a, b) => {
      const num = Number(b.split(" ")[0]);
      return num > a ? num : a;
    }, 0) ?? 0
  );
};

export const cubeConundrum = () => {
  const gameSum = prodInput.split("\n").reduce(
    (sum, game) => {
      const gameId = Number(game.split(":")[0].replace(/[A-Za-z]+/, ""));
      // prettier-ignore
      const [r, g, b] = [reducer(game, "red"), reducer(game, "green"), reducer(game, "blue")];
      const idSum = (r > 12 || g > 13 || b > 14 ? 0 : gameId) + sum.idSum;
      const squareSum = sum.squareSum + r * g * b;
      return { idSum, squareSum };
    },
    { idSum: 0, squareSum: 0 }
  );
  console.log("Part 1:", gameSum.idSum); // Part 1
  console.log("Part 2:", gameSum.squareSum); // Part 2
};
