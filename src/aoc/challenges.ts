import { findElvenCalories } from "../2022-01/elvenCalories";
import { RPSBattle } from "../2022-02/rpsSimulator";
import { organizeRucksack } from "../2022-03/rucksackReorganization";
import { campCleanup } from "../2022-04/campCleanup";
import { supplyStacks } from "../2022-05/supplyStacks";
import { tuningTrouble } from "../2022-06/tuningTrouble";
import { noSpaceOnDevice } from "../2022-07/noSpaceOnDevice";
import { treetopTreeHouse } from "../2022-08/treetopTreeHouse";
import { ropeBridge } from "../2022-09/ropeBridge";
import { cathodeRayTube } from "../2022-10/cathodeRayTube";
import { elvenPathFinder } from "../2022-12/findpath";
import { probosciedaVolcanium } from "../2022-16/probosciedaVolcanium";
import { trebuchet } from "../2023-01/trebuchet";
import { cubeConundrum } from "../2023-02/cubeConundrum";
import { gearRatios } from "../2023-03/gearRatios";
import { scratchcards } from "../2023-04/scratchcards";
import { seedFertilizer } from "../2023-05/giveSeedFertilizer";
import { waitForIt } from "../2023-06/waitForIt";
import { camelCards } from "../2023-07/camelCards";
import { wasteland } from "../2023-08/hauntedWasteland";
import { mirage } from "../2023-09/mirageMaintenance";
import { pipeMaze } from "../2023-10/pipeMaze";

export enum Perf {
  NotComplete = 0,
  Ultra = -1,
  Fast = 1,
  Mediocre = 2,
  Slow = 3,
  Impossible = 4,
  Terrible = 5,
}

interface Challenge {
  year: number;
  day: number;
  part1?: Perf;
  part2?: Perf;
  fn?: () => void;
}

export const challenges: Challenge[] = [
  { year: 2023, day: 1, fn: trebuchet, part1: Perf.Ultra, part2: Perf.Ultra },
  {
    year: 2023,
    day: 2,
    fn: cubeConundrum,
    part1: Perf.Ultra,
    part2: Perf.Ultra,
  },
  { year: 2023, day: 3, fn: gearRatios, part1: Perf.Ultra, part2: Perf.Ultra },
  {
    year: 2023,
    day: 4,
    fn: scratchcards,
    part1: Perf.Ultra,
    part2: Perf.Ultra,
  },
  {
    year: 2023,
    day: 5,
    fn: seedFertilizer,
    part1: Perf.Ultra,
    part2: Perf.Ultra,
  },
  {
    year: 2023,
    day: 6,
    fn: waitForIt,
    part1: Perf.Impossible,
    part2: Perf.Impossible,
  },
  { year: 2023, day: 7, fn: camelCards, part1: Perf.Fast, part2: Perf.Fast },
  { year: 2023, day: 8, fn: wasteland, part1: Perf.Fast, part2: Perf.Fast },
  { year: 2023, day: 9, fn: mirage, part1: Perf.Ultra, part2: Perf.Ultra },
  { year: 2023, day: 10, fn: pipeMaze, part1: Perf.Fast, part2: Perf.Fast },
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
    day: 8,
    fn: treetopTreeHouse,
    part1: Perf.Fast,
    part2: Perf.Fast,
  },
  {
    year: 2022,
    day: 9,
    fn: ropeBridge,
    part1: Perf.Fast,
    part2: Perf.Fast,
  },
  {
    year: 2022,
    day: 10,
    fn: cathodeRayTube,
    part1: Perf.Fast,
    part2: Perf.Fast,
  },
  {
    year: 2022,
    day: 12,
    part1: Perf.Fast,
    part2: Perf.Fast,
    fn: elvenPathFinder,
  },
  {
    year: 2022,
    day: 16,
    fn: probosciedaVolcanium,
    part1: Perf.Slow,
    part2: Perf.Slow,
  },
];
