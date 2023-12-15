import { prodInput } from "./input";

interface Lens {
  focusingPower: number;
  focalLength: number;
  label: string;
  position: number;
}

type Lenses = Record<string, Lens>;

interface Box {
  position: number;
  lenses: Lenses;
}

type Boxes = Record<number, Box>;

const hashChar = (n: number, c: string) => ((n + c.charCodeAt(0)) * 17) % 256;

const hashString = (s: string) => Array.from(s).reduce(hashChar, 0);

const addLens = (boxes: Boxes, label: string, box: number, focal: number) => {
  const b = boxes[box];
  // Create a box if it doesn't exist
  if (!b) boxes[box] = { position: box, lenses: {} };
  const lens = boxes[box].lenses[label];
  const position = Object.keys(boxes[box].lenses).length + 1;
  // Add new
  if (!lens)
    boxes[box].lenses[label] = {
      position,
      label,
      focalLength: focal,
      focusingPower: (box + 1) * position * focal,
    };
  // Modify previous
  else {
    lens.focalLength = focal;
    lens.focusingPower = (box + 1) * lens.position * focal;
  }
};

const removeLens = (boxes: Boxes, label: string, box: number) => {
  const b = boxes[box];
  if (!b) return;

  const lens = b.lenses[label];
  if (!lens) return;

  const delPos = b.lenses[label].position;
  delete b.lenses[label];

  Object.entries(b.lenses).forEach(([k, v]) => {
    if (v.position > delPos) {
      b.lenses[k].position--;
      b.lenses[k].focusingPower =
        (box + 1) * b.lenses[k].position * b.lenses[k].focalLength;
    }
  });
};

const generateBoxes = (array: string[]) => {
  const boxes: Boxes = {};
  array.forEach((str) => {
    const [label, num] = str.split(/=|-/);
    const add = str.includes("=");
    const box = hashString(label);
    const focal = Number(num);
    if (add) addLens(boxes, label, box, focal);
    else removeLens(boxes, label, box);
  });
  return boxes;
};

const boxSummary = (boxes: Boxes) =>
  Object.values(boxes).reduce(
    (s, b) =>
      s + Object.values(b.lenses).reduce((n, i) => n + i.focusingPower, 0),
    0
  );

export const lens = () => {
  const array = prodInput.split(",");
  const p1 = array.reduce((sum, str) => sum + hashString(str), 0);

  // Part 1
  console.log("Part 1:", p1);

  const boxes = generateBoxes(array);
  const p2 = boxSummary(boxes);

  // Part 1
  console.log("Part 2:", p2);
};
