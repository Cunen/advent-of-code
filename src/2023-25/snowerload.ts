import { findCharsFromString, puzzleArray } from "../aoc/utils";
import { prodInput, testInput } from "./input";

interface Comp {
  name: string;
  connected: Set<string>;
}

type Comps = Map<string, Comp>;

export const snowComponents = new Map<string, Comp>();

export const snowerload = () => {
  const array = puzzleArray(testInput);
  for (const row of array) {
    const [head, tail] = row.split(":");
    if (!snowComponents.has(head)) {
      snowComponents.set(head, { name: head, connected: new Set<string>() });
    }
    const comp = snowComponents.get(head)!;
    const targets = findCharsFromString(tail);
    for (const target of targets) {
      if (!snowComponents.has(target)) {
        snowComponents.set(target, {
          name: target,
          connected: new Set<string>(),
        });
      }
      const t = snowComponents.get(target)!;
      t.connected.add(head);
      comp.connected.add(target);
    }
  }
  console.log(snowComponents);
};
