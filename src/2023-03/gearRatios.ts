import { prodInput } from "./input";

let gears: Record<string, number[]> = {};

export const gearRatios = () => {
  // proto();
  const engineArray = prodInput.split("\n");
  let sum = 0;
  gears = {};
  engineArray.forEach((engineLine, y) => {
    let modifiedLine = engineLine;
    const foundNumbers = engineLine.match(/[0-9]+/g);

    foundNumbers?.forEach((num) => {
      // Width of the part number
      const width = num.length;

      const index = modifiedLine.indexOf(num);
      // Prevent chance of duplicates
      modifiedLine =
        ".".repeat(index + width) + modifiedLine.slice(index + width);

      // Characters above the part number
      const topRow =
        y >= 1
          ? engineArray.at(y - 1)?.substring(index - 1, index + width + 1) || ""
          : "";
      // Characters below the part number
      const bottomRow =
        engineArray.at(y + 1)?.substring(index - 1, index + width + 1) || "";
      // Character to the left of the part number
      const left = engineLine.substring(index - 1, index);
      // Character to the right of the part number
      const right = engineLine.substring(index + width, index + width + 1);

      // Check for any symbols in the surrounding characters
      const compactRegex = /[^.\d]/g;
      const symbols = (topRow + bottomRow + left + right).match(compactRegex);

      const topHasGear = topRow.indexOf("*");
      const lHasGear = left === "*";
      const rHasGear = right === "*";
      const bottomHasGear = bottomRow.indexOf("*");

      if (topHasGear >= 0) {
        const xPos = index - (index > 0 ? 1 : 0) + topHasGear;
        const gear = `${y - 1}-${xPos}`;
        if (engineArray[y - 1][xPos] !== "*") console.log("ERROR TOP");
        if (!gears[gear]) gears[gear] = [Number(num)];
        else gears[gear].push(Number(num));
      }
      if (bottomHasGear >= 0) {
        const xPos = index - (index > 0 ? 1 : 0) + bottomHasGear;
        const gear = `${y + 1}-${xPos}`;
        if (engineArray[y + 1][xPos] !== "*") console.log("ERROR BOTTOM");
        if (!gears[gear]) gears[gear] = [Number(num)];
        else gears[gear].push(Number(num));
      }
      if (rHasGear) {
        const gear = `${y}-${index + width}`;
        if (!gears[gear]) gears[gear] = [Number(num)];
        else gears[gear].push(Number(num));
      }
      if (lHasGear) {
        const gear = `${y}-${index - 1}`;
        if (!gears[gear]) gears[gear] = [Number(num)];
        else gears[gear].push(Number(num));
      }

      // If a Symbol is found, add to sum
      const foundSymbols = symbols && symbols.length > 0;

      sum += Number(foundSymbols) * Number(num);
    });
  });

  // Test Score (4361)
  // Too Low (485790)
  // Not Correct (531804)
  // Not Correct (511530) (Normal REGEX)
  // Not Correct (511948)
  // Using some alternate regex, WRONG (532300)
  // After I Fixed modifiedLine (532428) / CORRECT ANSWER
  console.log("Part 1:", sum);

  const gearSum = Object.values(gears).reduce((sum, nums) => {
    if (nums.length >= 2) {
      return sum + nums[0] * nums[1];
    } else return sum;
  }, 0);

  // Part 2
  // 83 902 670 is TOO LOW
  // Try 2: 84 051 670
  console.log("Part 2:", gearSum);
};
