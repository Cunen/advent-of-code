import { findElvenCalories } from "../2022-01/elvenCalories";
import { elvenPathFinder } from "../2022-12/findpath";

export enum Perf {
  NotComplete = 0,
  Ultra = -1,
  Fast = 1,
  Mediocre = 2,
  Slow = 3,
}

interface Challenge {
  year: number;
  day: number;
  part1?: Perf;
  part2?: Perf;
  fn?: () => void;
}

export const challenges: Challenge[] = [
  {
    year: 2022,
    day: 1,
    fn: findElvenCalories,
    part1: Perf.Ultra,
    part2: Perf.Ultra,
  },
  {
    year: 2022,
    day: 12,
    part1: Perf.Fast,
    part2: Perf.Fast,
    fn: elvenPathFinder,
  },
  { year: 2023, day: 1 },
  { year: 2023, day: 2 },
  { year: 2023, day: 3 },
  { year: 2023, day: 4 },
  { year: 2023, day: 5 },
  { year: 2023, day: 6 },
  { year: 2023, day: 7 },
  { year: 2023, day: 8 },
  { year: 2023, day: 9 },
  { year: 2023, day: 10 },
  { year: 2023, day: 11 },
  { year: 2023, day: 12 },
  { year: 2023, day: 13 },
  { year: 2023, day: 14 },
  { year: 2023, day: 15 },
  { year: 2023, day: 16 },
  { year: 2023, day: 17 },
  { year: 2023, day: 18 },
  { year: 2023, day: 19 },
  { year: 2023, day: 20 },
  { year: 2023, day: 21 },
  { year: 2023, day: 22 },
  { year: 2023, day: 23 },
  { year: 2023, day: 24 },
  { year: 2023, day: 25 },
];
