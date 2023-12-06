import { prodInput } from "./input";

const quadr = (b: number, c: number) =>
  Math.ceil((-1 * b + Math.sqrt(b * b - 4 * c)) / (2 * -1));

const waysToWin = (time: number, ms: number) => time - 2 * ms + 1;

export const waitForIt = () => {
  const [times, distances] = prodInput.split("\n");
  const timesArray = (times.match(/[0-9]+/g) || []).map(Number);
  const distanceArray = (distances.match(/[0-9]+/g) || []).map(Number);
  const singleTime = Number(timesArray.join(""));
  const singleDistance = Number(distanceArray.join(""));
  const waysToWinMultiplied = timesArray.reduce(
    (mult, time, i) => mult * waysToWin(time, quadr(time, distanceArray[i])),
    1
  );
  // Part 1
  console.log("Part 1", waysToWinMultiplied);
  // Part 2
  console.log(
    "Part 2:",
    waysToWin(singleTime, quadr(singleTime, singleDistance))
  );
};
