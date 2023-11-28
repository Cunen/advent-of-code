import { prodInput } from "./input";

export const campCleanup = () => {
  let fullOverlapCount = 0;
  let overlapCount = 0;
  prodInput.split("\n").forEach((pair) => {
    const [a, b] = pair.split(",");
    const [a1, a2] = a.split("-");
    const [b1, b2] = b.split("-");

    const [a1n, a2n, b1n, b2n] = [
      Number(a1),
      Number(a2),
      Number(b1),
      Number(b2),
    ];

    const aContainsB = a1n <= b1n && a2n >= b2n;
    const bContainsA = b1n <= a1n && b2n >= a2n;
    if (aContainsB || bContainsA) fullOverlapCount += 1;

    const bInRangeOfA = b1n >= a1n && b1n <= a2n;
    const aInRangeOfB = a1n >= b1n && a1n <= b2n;
    if (bInRangeOfA || aInRangeOfB) overlapCount += 1;
  });

  // Part 1
  console.log("Part 1:", fullOverlapCount);

  // Part 2
  console.log("Part 2:", overlapCount);
};
