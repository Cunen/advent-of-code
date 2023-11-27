import { heightArray } from "./input";

export const elvenPathFinder = () => {
  const map = heightArray;
  let visited: Record<string, boolean> = {};
  let complete = false;

  // Reads value from heightmap
  const getValue = (coord: number[]) => {
    const [x, y] = coord;
    const coordUndefined = x === undefined || y === undefined;
    if (coordUndefined || map[y] === undefined || map[y][x] === undefined)
      return null;
    return map[y][x];
  };

  // Check if can proceed to given coordinates
  const canGo = (from: number[], to: number[], findZero = false) => {
    const fromValue = getValue(from);
    const toValue = getValue(to);
    if (fromValue === null || toValue === null) return false;
    // Check that location not yet visited and elevation is OK
    const target = `${to.at(0)}-${to.at(1)}`;
    const correctedToValue = toValue < 0 ? 0 : toValue;
    const correctedFromValue = fromValue < 0 ? 25 : fromValue;
    const stepHeightOk = correctedFromValue <= correctedToValue + 1;
    const hasBeenVisited = visited[target];

    if (!hasBeenVisited && stepHeightOk) {
      // Mark position as visited
      if (findZero && toValue <= 0) complete = true;
      if (toValue < 0) complete = true;
      visited[target] = true;
      return true;
    }
    return false;
  };

  const runPath = (paths: number[][], steps = 1, findZero = false): number => {
    const newPaths = paths.flatMap((path) => {
      const [up, down, left, right] = [
        [path.at(0) ?? 0, (path.at(1) ?? 0) - 1],
        [path.at(0) ?? 0, (path.at(1) ?? 0) + 1],
        [(path.at(0) ?? 0) - 1, path.at(1) ?? 0],
        [(path.at(0) ?? 0) + 1, path.at(1) ?? 0],
      ];
      const newPath = [];
      // Check progression directions
      if (canGo(path, up, findZero)) newPath.push(up);
      if (canGo(path, down, findZero)) newPath.push(down);
      if (canGo(path, left, findZero)) newPath.push(left);
      if (canGo(path, right, findZero)) newPath.push(right);
      if (complete) return [];
      return newPath;
    });
    if (complete) return steps;
    else if (newPaths.length > 0) return runPath(newPaths, steps + 1, findZero);
    else return Infinity;
  };

  const [a, b] = [135, 20];
  const startPathString = `${a}-${b}`;

  // Part 1
  visited = { [startPathString]: true };
  const part1 = runPath([[a, b]]);
  console.log("Part 1 Steps:", part1);

  // Part 2
  visited = { [startPathString]: true };
  complete = false;
  const part2 = runPath([[a, b]], 1, true);
  console.log("Part 2 Steps:", part2);

};
