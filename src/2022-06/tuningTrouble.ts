import { prodInput } from "./input";

const isUniqString = (str: string) => {
  const array = Array.from(str);
  const hasDuplicate = array.some(
    (char) => array.indexOf(char) !== array.lastIndexOf(char)
  );
  return !hasDuplicate;
};

export const tuningTrouble = () => {
  let i = 0;
  let len4found = 0;
  let len14found = 0;
  while (!len14found) {
    const len4 = prodInput.substring(i, i + 4);
    const len14 = prodInput.substring(i, i + 14);
    if (!len4found && isUniqString(len4)) len4found = i + 4;
    if (!len14found && isUniqString(len14)) len14found = i + 14;
    i++;
  }

  // Part 1
  console.log("Part 1:", len4found);

  // Part 2
  console.log("Part 2:", len14found);
};
