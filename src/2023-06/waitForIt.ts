import { prodInput } from "./input";

const getMinHold = (time: number, distance: number) => {
  let startMs = Math.ceil(distance / time);
  let dist = (time - startMs) * startMs;
  while (dist <= distance) {
    startMs++;
    dist = (time - startMs) * startMs;
  }
  return startMs;
};

export const waitForIt = () => {
  const [times, distances] = prodInput.split("\n");
  const timesArray = (times.match(/[0-9]+/g) || []).map(Number);
  const distanceArray = (distances.match(/[0-9]+/g) || []).map(Number);

  const part1 = timesArray.reduce((mult, time, i) => {
    const distance = distanceArray[i];
    const minHold = getMinHold(time, distance);
    const waysToWin = time - 2 * minHold + 1;
    return mult * Math.max(waysToWin, 1);
  }, 1);

  // Part 1
  console.log("Part 1", part1);

  // Part 2
  const singleTime = Number(timesArray.join(""));
  const singleDistance = Number(distanceArray.join(""));
  const singleMinHold = getMinHold(singleTime, singleDistance);
  const singleWaysToWin = singleTime - 2 * singleMinHold + 1;
  console.log("Part 2:", singleWaysToWin);
};
