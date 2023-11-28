import { roundsOfRPS } from "./input";

export const RPSBattle = () => {
  const rounds = roundsOfRPS;
  const sum = rounds.reduce((a, b) => a + b.points, 0);
  console.log("Part 1:", sum);
  const sum2 = rounds.reduce((a, b) => a + b.points2, 0);
  console.log("Part 2:", sum2);
};
