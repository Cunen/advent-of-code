import { findNumberValuesFromString, puzzleArray } from "../aoc/utils";
import { prodInput } from "./input";

const validate = (str: string, nums: number[], exact = false, tail: string) => {
  const final = !tail.includes("?");

  const matchExact = final ? true : exact;
  const string = final ? str + tail : str;

  const hashNums = (string.match(/#+/g) || []).map((h) => h.length);

  const hashSum = hashNums.reduce((a, b) => a + b, 0);
  const numsSum = nums.reduce((a, b) => a + b, 0);

  // There can never be more hashes than nums
  if (hashSum > numsSum) return false;
  // Final round, but mismatch in hash & num sums
  if (final && hashSum !== numsSum) return false;

  // All must match
  return !hashNums.some((n, i) => {
    // Non-exact match allows last to be smaller than nums[i]
    if (i === hashNums.length - 1 && !matchExact) return n > nums[i];
    // Otherwise must match EXACTLY
    return n !== nums[i];
  });
};

const cache = new Map<string, number>();

const getVariations = (str: string, nums: number[]): number => {
  if (!str.includes("?")) return 1;

  const key = [str, nums].join(" ");
  if (cache.has(key)) return cache.get(key)!;

  const index = str.indexOf("?");
  const head = str.substring(0, index);
  const tail = str.substring(index + 1);

  const newHeadHash = head + "#";
  const hashValid = validate(newHeadHash, nums, false, tail);
  // Replace preceding ...#...## --> ##
  const replacedHash = newHeadHash.replace(/\.*#+\.+#/, "#");
  const hashNums = [...nums];
  if (newHeadHash !== replacedHash) hashNums.shift();
  const hashNum = hashValid ? getVariations(replacedHash + tail, hashNums) : 0;

  const newHeadDot = head + ".";
  const dotValid = validate(newHeadDot, nums, true, tail);
  // Replace preceding ...#...## --> ##
  const replacedDot = newHeadDot.replace(/\.*#+\.+#/, "#");
  const dotNums = [...nums];
  if (newHeadDot !== replacedDot) dotNums.shift();
  const dotNum = dotValid ? getVariations(replacedDot + tail, dotNums) : 0;

  cache.set(key, hashNum + dotNum);
  return hashNum + dotNum;
};

export const hotspring = () => {
  const inputArray = puzzleArray(prodInput);

  const p1 = inputArray.reduce((sum, row, i) => {
    const [t, n] = row.split(" ");

    const text = t.repeat(1);
    const nums = (n + ",").repeat(1);

    const numbers = findNumberValuesFromString(nums);
    return sum + getVariations(text, numbers);
  }, 0);

  console.log(p1);
};
