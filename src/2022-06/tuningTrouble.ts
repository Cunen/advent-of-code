import { uniqueString } from "../aoc/utils";
import { prodInput } from "./input";

export const tuningTrouble = () => {
  let i = 0;
  let len4found = 0;
  let len14found = 0;
  while (!len14found) {
    const len4 = prodInput.substring(i, i + 4);
    const len14 = prodInput.substring(i, i + 14);
    if (!len4found && uniqueString(len4)) len4found = i + 4;
    if (!len14found && uniqueString(len14)) len14found = i + 14;
    i++;
  }

  // Part 1
  console.log("Part 1:", len4found);

  // Part 2
  console.log("Part 2:", len14found);
};
