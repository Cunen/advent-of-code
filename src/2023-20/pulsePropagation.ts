import { arrayLcm, findNumberValuesFromString, lcm, puzzleArray } from "../aoc/utils";
import { minExample, prodInput, testInput } from "./input";

interface Caster {
  name: string;
  flip: boolean;
  conj: boolean;
  conjCount: number;
  on: boolean;
  loop: number;
  prevNum: number;
  rawTargets: string[];
  targets: Caster[];
  senders: Caster[];
}

type Casters = Record<string, Caster>;

/** Create empty casters */
const createCasters = (array: string[]) => {
  const casters: Casters = {};
  for (const row of array) {
    const [fullName, allTargets] = row.split(" -> ");
    const conj = fullName.startsWith("&");
    const flip = fullName.startsWith("%");
    const name = fullName.replace(/%|&/, "");
    casters[name] = {
      name,
      flip,
      conj,
      conjCount: 0,
      loop: 0,
      prevNum: 0,
      on: false,
      rawTargets: allTargets.split(", "),
      targets: [],
      senders: [],
    };
  }
  return casters;
};

/** Return casters with targets/senders */
const getCasters = (array: string[]) => {
  const casters = createCasters(array);
  for (const caster of Object.values(casters)) {
    for (const t of caster.rawTargets) {
      const targetCaster = casters[t];
      if (targetCaster?.conj) targetCaster.senders.push(caster);
      if (targetCaster) caster.targets.push(targetCaster);
      else {
        casters[t] = {
          name: t,
          flip: false,
          conj: false,
          conjCount: 0,
          loop: 0,
          prevNum: 0,
          on: false,
          rawTargets: [],
          targets: [],
          senders: [],
        };
        caster.targets.push(casters[t]);
      }
    }
  }
  return casters;
};

export const pulse = async () => {
  const casters = getCasters(puzzleArray(prodInput));

  let lowCount = 0;
  let highCount = 0;
  let rx = 0;

  const run = (caster: Caster, high: boolean) => {
    if (high) highCount++;
    else lowCount++;

    // Reached output
    if (caster.targets.length <= 0) return;
    // [FlipFlop] ignores high pulse
    else if (caster.flip && high) return;
    // [FlipFlop] ()
    //
    else if (caster.flip) {
      const newPulse = !caster.on;
      caster.on = newPulse;
      if (newPulse) {
        caster.loop = rx - caster.prevNum;
        caster.prevNum = rx;
      }
      for (const c of caster.targets) run(c, newPulse);
      return;
    }

    // [Conjunction] (should wait?)
    else if (caster.conj) {
      // If all are on (high) - set caster off (low)
      const newPulse = !caster.senders.every((s) => s.on);
      caster.on = newPulse;
      if (newPulse) {
        caster.loop = rx - caster.prevNum;
        caster.prevNum = rx;
      }
      for (const c of caster.targets) run(c, newPulse);
      return;
    }

    // Broadcast / Passthrough
    for (const c of caster.targets) run(c, high);
    return;
  };

  for (let i = 0; i < 1000; i++) {
    rx++;
    run(casters["broadcaster"], false);
  }

  for (let i = 0; i < 5000000; i++) {
    rx++;
    run(casters["broadcaster"], false);
  }

  console.log("Part 1", highCount * lowCount);

  const nrBits = [
    casters["kd"].loop,
    casters["jh"].loop,
    casters["cf"].loop,
    casters["nv"].loop,
    casters["df"].loop,
    casters["fd"].loop,
    casters["cm"].loop,
  ];

  console.log(nrBits);

  const fn = arrayLcm(nrBits);
  const hh = casters['hh'].loop;
  const lk = casters['lk'].loop;
  const fh = casters['fh'].loop;

  console.log(fn, hh, lk, fh);

  const nc = arrayLcm([fn, hh, lk, fh]);

  // (379048322907917650000) Too High
  // (127136628594688) Too Low
  console.log("Part 2", nc);
};
