/** Returns Greatest Common Divisor between two numbers */
export const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

/** Returns Least Common Multiplier between two numbers */
export const lcm = (a: number, b: number) => a * (b / gcd(a, b));

/** Returns Least Common Multiplier from array of numbers */
export const arrayLcm = (array: number[]) => array.reduce((a, b) => lcm(a, b));
