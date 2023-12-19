import { findNumberValuesFromString, puzzleArray } from "../aoc/utils";
import { prodInput, testInput } from "./input";

interface Condition {
  next: string;
  direct: boolean;
  valIndex: number;
  value: number;
  gt: boolean;
  lt: boolean;
  approve: boolean;
  reject: boolean;
}

interface Rule {
  name: string;
  conditions: Condition[];
}

type RuleSet = Record<string, Rule>;

const valMap: Record<string, number> = { x: 0, m: 1, a: 2, s: 3 };
type Mins = "xmin" | "mmin" | "amin" | "smin";
type Maxs = "xmax" | "mmax" | "amax" | "smax";
const minMap: Record<number, Mins> = {
  0: "xmin",
  1: "mmin",
  2: "amin",
  3: "smin",
};
const maxMap: Record<number, Maxs> = {
  0: "xmax",
  1: "mmax",
  2: "amax",
  3: "smax",
};

const rangeSum = (range: Record<Mins | Maxs, number>) => {
  const a = range.amax - range.amin + 1;
  const x = range.xmax - range.xmin + 1;
  const s = range.smax - range.smin + 1;
  const m = range.mmax - range.mmin + 1;
  return a * x * m * s;
};

const getNewRange = (r: Record<Mins | Maxs, number>) => {
  const newRange: Record<Mins | Maxs, number> = {
    xmin: r.xmin,
    mmin: r.mmin,
    amin: r.amin,
    smin: r.smin,
    xmax: r.xmax,
    mmax: r.mmax,
    amax: r.amax,
    smax: r.smax,
  };
  return newRange;
};

export const aplenty = async () => {
  const [a, b] = prodInput.split("\n\n");
  const rules = puzzleArray(a);
  const parts = puzzleArray(b);

  const ruleSet: RuleSet = {};

  rules.forEach((rule) => {
    const [key, tail] = rule.split("{");
    const conditions: Condition[] = tail
      .replace("}", "")
      .split(",")
      .map((row) => {
        const [a, b] = row.split(":");
        return {
          next: b ? b : a,
          gt: row.includes(">"),
          valIndex: Number(valMap[row[0]] ?? 0),
          value: b ? Number(row.match(/[0-9]+/)) : 0,
          lt: row.includes("<"),
          direct: !row.includes(":"),
          approve: row.endsWith("A"),
          reject: row.endsWith("R"),
        };
      });
    ruleSet[key] = {
      name: key,
      conditions,
    };
  });

  const run = (nums: number[], rule: Rule): boolean => {
    for (const condition of rule.conditions) {
      // Direct Approval
      if (condition.direct && condition.approve) return true;
      // Direct Rejection
      else if (condition.direct && condition.reject) return false;
      // Direct path
      else if (condition.direct) {
        return run(nums, ruleSet[condition.next]);
      }

      const val = nums[condition.valIndex];
      const gt = condition.gt && val > condition.value;
      const lt = condition.lt && val < condition.value;

      if (gt || lt) {
        if (condition.approve) return true;
        else if (condition.reject) return false;
        else return run(nums, ruleSet[condition.next]);
      }
    }
    return false;
  };

  const ranges: Record<Mins | Maxs, number> = {
    xmin: 1,
    mmin: 1,
    amin: 1,
    smin: 1,
    xmax: 4000,
    mmax: 4000,
    amax: 4000,
    smax: 4000,
  };

  const run2 = (rule: Rule, r = ranges): number => {
    const loopRange = getNewRange(r);
    let loopSum = 0;
    for (const condition of rule.conditions) {
      // Last Approval
      if (condition.direct && condition.approve) {
        loopSum += rangeSum(loopRange);
        break;
      }
      // Last Rejection
      else if (condition.direct && condition.reject) {
        break;
      }
      // Last Next
      else if (condition.direct) {
        loopSum += run2(ruleSet[condition.next], loopRange);
        break;
      }

      const gt = condition.gt;
      const minKey = minMap[condition.valIndex];
      const maxKey = maxMap[condition.valIndex];

      const newRange = getNewRange(loopRange);
      // Adjust range  for GT
      if (gt) {
        newRange[minKey] = condition.value + 1;
        loopRange[maxKey] = condition.value;
      }
      // Adjust range for LT
      else {
        newRange[maxKey] = condition.value - 1;
        loopRange[minKey] = condition.value;
      }

      // Return final range
      if (condition.approve) {
        // Found a ending
        loopSum += rangeSum(newRange);
      }
      // This range rule lead nowhere;
      else if (condition.reject) {
        // Continue with the loop
        continue;
      } else {
        loopSum += run2(ruleSet[condition.next], newRange);
      }
    }
    return loopSum;
  };

  const filtered = parts.filter((part) => {
    const nums = findNumberValuesFromString(part);
    return run(nums, ruleSet["in"]);
  });

  const sum = filtered.reduce((sum, part) => {
    const nums = findNumberValuesFromString(part);
    return sum + nums.reduce((a, b) => a + b);
  }, 0);

  // (377025)
  console.log("Part 1:", sum);

  console.log("Part 2:", run2(ruleSet["in"]));
};
