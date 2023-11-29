import { findElvenCalories } from "../2022-01/elvenCalories";
import { RPSBattle } from "../2022-02/rpsSimulator";
import { organizeRucksack } from "../2022-03/rucksackReorganization";
import { campCleanup } from "../2022-04/campCleanup";
import { supplyStacks } from "../2022-05/supplyStacks";
import { tuningTrouble } from "../2022-06/tuningTrouble";
import { noSpaceOnDevice } from "../2022-07/noSpaceOnDevice";
import { elvenPathFinder } from "../2022-12/findpath";

export enum Perf {
  NotComplete = 0,
  Ultra = -1,
  Fast = 1,
  Mediocre = 2,
  Slow = 3,
  Impossible = 4,
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
    day: 2,
    fn: RPSBattle,
    part1: Perf.Ultra,
    part2: Perf.Ultra,
  },
  {
    year: 2022,
    day: 3,
    fn: organizeRucksack,
    part1: Perf.Ultra,
    part2: Perf.Ultra,
  },
  {
    year: 2022,
    day: 4,
    fn: campCleanup,
    part1: Perf.Ultra,
    part2: Perf.Ultra,
  },
  {
    year: 2022,
    day: 5,
    fn: supplyStacks,
    part1: Perf.Ultra,
    part2: Perf.Ultra,
  },
  {
    year: 2022,
    day: 6,
    fn: tuningTrouble,
    part1: Perf.Fast,
    part2: Perf.Fast,
  },
  {
    year: 2022,
    day: 7,
    fn: noSpaceOnDevice,
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
