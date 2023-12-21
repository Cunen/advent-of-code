import { arrayLcm, puzzleArray } from "../aoc/utils";
import { prodInput } from "./input";

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

  const flip = (caster: Caster, high: boolean) => {
    // Reached output
    if (caster.targets.length <= 0) return;
    // [FlipFlop] ignores high pulse
    else if (caster.flip && high) return;
    // [FlipFlop] ()
    else if (caster.flip || caster.conj) {
      const newPulse = caster.flip
        ? !caster.on
        : !caster.senders.every((s) => s.on);
      caster.on = newPulse;
      // Store loop in memory
      if (newPulse) {
        caster.loop = rx - caster.prevNum;
        caster.prevNum = rx;
      }
    }
  };

  const run = (caster: Caster, high: boolean) => {
    if (high) highCount++;
    else lowCount++;

    // Reached output
    if (caster.targets.length <= 0) return;
    // [FlipFlop] ignores high pulse
    else if (caster.flip && high) return;
    // [FlipFlop] low pulse
    else if (caster.flip) {
      for (const c of caster.targets) flip(c, caster.on);
      for (const c of caster.targets) run(c, caster.on);
      return;
    } else if (caster.conj) {
      for (const c of caster.targets) flip(c, caster.on);
      for (const c of caster.targets) run(c, caster.on);
      return;
    }

    // Broadcast / Passthrough
    for (const c of caster.targets) flip(c, high);
    for (const c of caster.targets) run(c, high);
    return;
  };

  for (let i = 0; i < 1000; i++) {
    rx++;
    run(casters["broadcaster"], false);
  }

  console.log("Part 1", highCount * lowCount);

  for (let i = 0; i < 3027; i++) {
    rx++;
    run(casters["broadcaster"], false);
  }

  // These three turn on and off during the same cycle
  const fn = casters["fn"].loop; // 3847
  const hh = casters["hh"].loop; // 4027
  const lk = casters["lk"].loop; // 4003
  const fh = casters["fh"].loop; // 3851

  // NC is the & module before rx
  const p2 = arrayLcm([fn, hh, lk, fh]);

  // Part 2: (238815727638557)
  console.log("Part 2", p2);
};
