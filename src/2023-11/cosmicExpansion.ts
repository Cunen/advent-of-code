import { puzzleArray, stringToArray, xyToKey } from "../aoc/utils";
import { prodInput } from "./input";

type Galaxy = {
  x: number;
  y: number;
};

const getExpansionRows = (universe: string[]) => {
  const expansionRows: number[] = [];
  return universe.reduce((sum, u, i) => {
    if (!u.includes("#")) sum.push(i);
    return sum;
  }, expansionRows);
};

const getColumnsToExpand = (universe: string[]) => {
  const cols: Record<number, boolean> = {};
  const universeMatrix = universe.map(stringToArray);
  universeMatrix.forEach((row) =>
    row.forEach((char, i) => {
      if (char === "#") cols[i] = true;
    })
  );
  const expansionColumns: number[] = [];
  return new Array(universeMatrix[0].length).fill(".").reduce((sum, _, i) => {
    if (!cols[i]) sum.push(i);
    return sum;
  }, expansionColumns);
};

const getGalaxies = (universe: string[]) => {
  const galaxies: Record<string, Galaxy> = {};
  universe.forEach((row, y) => {
    const charArr = Array.from(row);
    charArr.forEach((char, x) => {
      if (char === "#") galaxies[xyToKey(x, y)] = { x, y };
    });
  });
  return galaxies;
};

const distanceBetweenGalaxies = (a: Galaxy, b: Galaxy) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const getTotalGalaxyDistance = (
  galaxies: Record<string, Galaxy>,
  rows: number[],
  cols: number[],
  multiplier = 1
) => {
  const galaxyArray = Object.entries(galaxies);
  const totalGalaxyDistance = galaxyArray.reduce((totalDistance, [, g1]) => {
    const distanceFromOneToOthers = galaxyArray.reduce((s, [, g2]) => {
      // How many times the expanded between the Y's
      const rowExpansionFactor = rows.filter((r) => {
        const fwd = r > g2.y && r < g1.y;
        const bwd = r < g2.y && r > g1.y;
        return fwd || bwd;
      }).length;
      // How many times the expanded between the X's
      const columnExpansionFactor = cols.filter((c) => {
        const fwd = c > g2.x && c < g1.x;
        const bwd = c < g2.x && c > g1.x;
        return fwd || bwd;
      }).length;
      const expandedDistance =
        (rowExpansionFactor + columnExpansionFactor) * multiplier;
      return s + distanceBetweenGalaxies(g1, g2) + expandedDistance;
    }, 0);
    return totalDistance + distanceFromOneToOthers;
  }, 0);
  // Divide by 2 as galaxies are counted a -> b and b -> a
  return totalGalaxyDistance / 2;
};

export const cosmic = () => {
  const universe = puzzleArray(prodInput);

  const rowsToExpand = getExpansionRows(universe);
  const columnsToExpand = getColumnsToExpand(universe);

  // expandUniverse(rowsToExpand, columnsToExpand, universe);

  const galaxies = getGalaxies(universe);

  const p1 = getTotalGalaxyDistance(galaxies, rowsToExpand, columnsToExpand);

  const p2 = getTotalGalaxyDistance(
    galaxies,
    rowsToExpand,
    columnsToExpand,
    999999
  );

  // Part 1 (9724940)
  console.log("Part 1:", p1);

  // Part 2 (569 052 586 852)
  console.log("Part 2:", p2);
};
