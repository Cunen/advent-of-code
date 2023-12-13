/** Returns Greatest Common Divisor between two numbers */
export const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

/** Returns Least Common Multiplier between two numbers */
export const lcm = (a: number, b: number) => a * (b / gcd(a, b));

/** Returns Least Common Multiplier from array of numbers */
export const arrayLcm = (array: number[]) => array.reduce((a, b) => lcm(a, b));

/** Converts "ASD" to ["A", "S", "D"] */
export const stringToArray = (str: string) => Array.from(str);

/** Converts "123" to [1, 2, 3] */
export const stringToNumericArray = (str: string) =>
  stringToArray(str).map(Number);

/** Converts ..123...345.. to ["123", "345"] */
export const findNumbersFromString = (str: string): string[] =>
  str.match(/-?[0-9]+/g) || [];

/** Converts ..1A3...3B5.. to ["1A3", "3B5"] */
export const findCharsAndNumbersFromString = (str: string): string[] =>
  str.match(/-?[0-9a-zA-Z]+/g) || [];

/** Converts ..aBC...bCD.. to ["aBC", "bCD"] */
export const findCharsFromString = (str: string): string[] =>
  str.match(/[a-zA-Z]+/g) || [];

/** Converts ..123...345.. to [123, 345] */
export const findNumberValuesFromString = (str: string) =>
  findNumbersFromString(str).map(Number);

/** Quadratic Formula (+) Side */
export const quadratic = (a: number, b: number, c: number) =>
  (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);

/** Quadratic Formula (-) Side */
export const quadraticNeg = (a: number, b: number, c: number) =>
  (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);

/** Checks if array only has unique values */
export const uniqueArray = (array: (string | number)[]) => {
  return array.length === new Set(array).size;
};

/** Checks if array consists of duplicate values */
export const duplicateArray = (array: (string | number)[]) => {
  return new Set(array).size === 1;
};

/** Checks if string only has unique characters */
export const uniqueString = (string: string) => {
  return uniqueArray(Array.from(string));
};

/** Checks if number only has unique numbers 0-9 */
export const uniqueNumber = (number: number) => {
  return uniqueArray(Array.from(number.toString()));
};

/** Splits puzzle input into an array of strings */
export const puzzleArray = (string: string) => string.split("\n");

/** Convers X and Y to a "x-y" string key */
export const xyToKey = (x: number, y: number) => `${x}-${y}`;

/** Converts rows to columns */
export const rowsToColumns = (rows: string[]) => {
  const columns: string[][] = [];
  rows.forEach((row) => {
    const rowChars = Array.from(row);
    rowChars.forEach((char, i) => {
      if (!columns[i]) columns.push([]);
      columns[i].push(char);
    });
  });
  return columns.map((c) => c.join(""));
};

/** Replace characters in string at given index */
export const strReplaceAt = (str: string, at: number, replacement: string) => {
  return (
    str.substring(0, at) + replacement + str.substring(at + replacement.length)
  );
};
