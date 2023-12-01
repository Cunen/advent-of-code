import { prodInput } from "./input";

const record: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  eno: "1",
  owt: "2",
  eerht: "3",
  ruof: "4",
  evif: "5",
  xis: "6",
  neves: "7",
  thgie: "8",
  enin: "9",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
};

export const trebuchet = () => {
  const regularArray = prodInput.split("\n");

  const summary = regularArray.reduce(
    (sum, str) => {
      const reverse = Array.from(str).reverse().join("");
      const a = str.match(/[0-9]/)?.at(0);
      const b = reverse.match(/[0-9]/)?.at(0);
      const c = str
        .match(/one|two|three|four|five|six|seven|eight|nine|[0-9]/)
        ?.at(0);
      const d = reverse
        .match(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[0-9]/)
        ?.at(0);
      return {
        p1: sum.p1 + (a && b ? Number(a + b) : 0),
        p2: sum.p2 + (c && d ? Number(record[c] + record[d]) : 0),
      };
    },
    { p1: 0, p2: 0 }
  );

  // Part 1 (55447)
  console.log("Part 1:", summary.p1);

  // Part 2 (54706)
  console.log("Part 2:", summary.p2);
};
