import { findNumberValuesFromString, puzzleArray } from "../aoc/utils";
import { prodInput } from "./input";

const validate = (str: string, nums: number[], exact = false, tail: string) => {
  const final = !tail.includes("?");

  let ex = final ? true : exact;
  let string = final ? str + tail : str;

  const hashNums = (string.match(/#+/g) || []).map((h) => h.length);

  const poo = hashNums.reduce((a, b) => a + b, 0);
  const doo = nums.reduce((a, b) => a + b, 0);

  if (poo > doo) return false;

  if (final && poo !== doo) return false;

  // All must match
  return !hashNums.some((n, i) => {
    // Non-exact match allows last to be smaller than nums[i]
    if (i === hashNums.length - 1 && !ex) return n > nums[i];
    // Otherwise must match EXACTLY
    return n !== nums[i];
  });
};

const getVariations = (str: string, nums: number[]): string[] => {
  if (!str.includes("?")) return [str];

  const index = str.indexOf("?");
  const head = str.substring(0, index);
  const tail = str.substring(index + 1);

  const newHeadHash = head + "#";
  const newHeadDot = head + ".";

  const hashValid = validate(newHeadHash, nums, false, tail);
  const dotValid = validate(newHeadDot, nums, true, tail);

  const newArray = [];

  if (hashValid) newArray.push(...getVariations(newHeadHash + tail, nums));
  if (dotValid) newArray.push(...getVariations(newHeadDot + tail, nums));

  return newArray;
};

export const hotspring = () => {
  const inputArray = puzzleArray(prodInput);

  const p1 = inputArray.reduce((sum, row, i) => {
    const [t, n] = row.split(" ");

    const text = t.repeat(1);
    const nums = (n + ",").repeat(1);

    const numbers = findNumberValuesFromString(nums);
    const variations = getVariations(text, numbers);
    return sum + variations.length;
  }, 0);

  console.log(p1);
};
