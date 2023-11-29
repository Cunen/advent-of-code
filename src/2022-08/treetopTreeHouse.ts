import { prodInput } from "./input";

interface Tree {
  count: number;
  right?: boolean;
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
}

export const treetopTreeHouse = () => {
  const visibleTrees: Record<string, Tree> = {};

  const registerTree = (
    x: number,
    y: number,
    dir: "left" | "right" | "top" | "bottom"
  ) => {
    let tree = visibleTrees[`${x}-${y}`];
    if (!visibleTrees[`${x}-${y}`]) {
      visibleTrees[`${x}-${y}`] = { count: 1 };
      tree = visibleTrees[`${x}-${y}`];
    } else {
      tree.count += 1;
    }
    tree.bottom = tree.bottom || dir === "bottom";
    tree.top = tree.top || dir === "top";
    tree.left = tree.left || dir === "left";
    tree.right = tree.right || dir === "right";
  };

  const array = prodInput.split("\n").map((s) => Array.from(s).map(Number));
  const bestArray = prodInput.split("\n").map((s) => Array.from(s).map(Number));

  const height = array.length;
  const width = array.at(0)?.length ?? 0;

  // Left / Right
  for (let y = 0; y < height; y++) {
    const row = array[y];
    let lHigh = -1;
    let rHigh = -1;
    for (let x = 0; x < width; x++) {
      const lIndex = x;
      const rIndex = row.length - x - 1;
      const lHeight = row[lIndex];
      const rHeight = row[rIndex];

      // Visibility Counting
      const leftSlice = row.slice(0, x).reverse();
      const rightSlice = row.slice(x + 1);

      const leftSide =
        leftSlice.findIndex((k) => k >= lHeight) + 1 || leftSlice.length;
      const rightSide =
        rightSlice.findIndex((k) => k >= lHeight) + 1 || rightSlice.length;

      const viewScore = leftSide * rightSide;
      bestArray[y][x] = viewScore;

      if (lHeight > lHigh) {
        registerTree(lIndex, y, "left");
        lHigh = lHeight;
      }

      if (rHeight > rHigh) {
        registerTree(rIndex, y, "right");
        rHigh = rHeight;
      }
    }
  }

  // Top / Bottom
  for (let x = 0; x < width; x++) {
    let tHigh = -1;
    let bHigh = -1;
    const column: number[] = [];
    for (let y = 0; y < height; y++) {
      const topIndex = y;
      const bottomIndex = height - y - 1;
      const topHeight = array[topIndex][x];
      const bottomHeight = array[bottomIndex][x];
      column.push(topHeight);

      if (topHeight > tHigh) {
        registerTree(x, topIndex, "top");
        tHigh = topHeight;
      }

      if (bottomHeight > bHigh) {
        registerTree(x, bottomIndex, "bottom");
        bHigh = bottomHeight;
      }
    }
    for (let y = 0; y < height; y++) {
      // Visibility Counting
      const topHeight = array[y][x];

      const topSlice = column.slice(0, y).reverse();
      const bottomSlice = column.slice(y + 1);

      const topSide =
        topSlice.findIndex((k) => k >= topHeight) + 1 || topSlice.length;
      const bottomSide =
        bottomSlice.findIndex((k) => k >= topHeight) + 1 || bottomSlice.length;

      const viewScore = topSide * bottomSide;

      const oldValue = bestArray[y][x];

      bestArray[y][x] = oldValue * viewScore;
    }
  }

  // Part 1
  console.log("Part 1:", Object.keys(visibleTrees).length);

  // Part 2
  console.log("Part 2:", Math.max(...bestArray.flat()));
};
