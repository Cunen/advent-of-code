import { prodInput } from "./input";

type Color = "red" | "green" | "blue";

const cubeLimits: Record<Color, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export const cubeConundrum = () => {
  const games = prodInput.split("\n");
  const summary = { idSum: 0, squareSum: 0 };
  const gameSum = games.reduce((sum, game) => {
    // Game ID
    const id = Number(game.split(":")[0].replace(/[A-Za-z]+/, ""));
    // Parse rounds
    const rounds = game.replace(/Game [0-9]+: /, "").split(";");

    let bMax = 0;
    let gMax = 0;
    let rMax = 0;

    let fault = false;
    rounds.forEach((round) => {
      const trimmed = round.trim();
      const cubes = trimmed.split(", ").map((c) => c.split(" "));

      let faultyRoll = false;
      cubes.forEach((roll) => {
        const count = Number(roll[0]);
        const color = roll[1] as Color;

        if (color === "green" && count > gMax) gMax = count;
        if (color === "red" && count > rMax) rMax = count;
        if (color === "blue" && count > bMax) bMax = count;

        if (count > cubeLimits[color]) faultyRoll = true;
      });

      if (faultyRoll) fault = true;
    });

    return {
      idSum: (!fault ? id : 0) + sum.idSum,
      squareSum: sum.squareSum + (bMax * gMax * rMax),
    };
  }, summary);

  console.log(gameSum);

  // Part 1
  console.log("Part 1:", gameSum.idSum);

  // Part 2
  console.log("Part 2:", gameSum.squareSum);
};
