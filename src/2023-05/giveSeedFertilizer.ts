import { prodInput } from "./input";

type Converter =
  | "seedToSoil"
  | "soilToFertilizer"
  | "fertilizerToWater"
  | "waterToLight"
  | "lightToTemperature"
  | "temperatureToHumidity"
  | "humidityToLocation";

const converters: Record<Converter, number[][]> = {
  seedToSoil: [],
  soilToFertilizer: [],
  fertilizerToWater: [],
  waterToLight: [],
  lightToTemperature: [],
  temperatureToHumidity: [],
  humidityToLocation: [],
};

const convert = (num: number, conv: Converter) => {
  const arr = converters[conv];
  if (!arr) return num;
  const converter = arr.find((s) => s[1] <= num && s[2] >= num);
  if (!converter) return num;
  const [base, min] = converter;
  return base + (num - min);
};

const seedToLocation = (num: number) => {
  const fert = convert(convert(num, "seedToSoil"), "soilToFertilizer");
  const light = convert(convert(fert, "fertilizerToWater"), "waterToLight");
  const humidity = convert(
    convert(light, "lightToTemperature"),
    "temperatureToHumidity"
  );
  return convert(humidity, "humidityToLocation");
};

const createRange = (array: string[], name: Converter) => {
  array.forEach((row) => {
    const split = row.split(" ");
    if (split.length <= 2) return;
    const base = Number(split[0]);
    const min = Number(split[1]);
    const max = Number(split[2]) + min;
    converters[name].push([base, min, max]);
  });
};

export const seedFertilizer = () => {
  const array = prodInput.split("\n\n");

  const seeds: string[] = array.at(0)?.split(" ") || [];
  seeds.shift();
  const seedNums = seeds.map(Number);

  // Part 1
  const seedRanges: { from: number, to: number}[] = [];
  seedNums.forEach((num, i) => {
    if (i % 2 === 1) {
      const from = seedNums[i - 1];
      const to = num + seedNums[i -1];
      seedRanges.push({ from, to });
    }
  });

  createRange(array.at(1)?.split("\n") || [], "seedToSoil");
  createRange(array.at(2)?.split("\n") || [], "soilToFertilizer");
  createRange(array.at(3)?.split("\n") || [], "fertilizerToWater");
  createRange(array.at(4)?.split("\n") || [], "waterToLight");
  createRange(array.at(5)?.split("\n") || [], "lightToTemperature");
  createRange(array.at(6)?.split("\n") || [], "temperatureToHumidity");
  createRange(array.at(7)?.split("\n") || [], "humidityToLocation");

  // Part 1 (322500873)
  console.log("Part 1:", Math.min(...seedNums.map(seedToLocation)));

  let min = Infinity;
  // WARNING THIS RUNS FOR 7.5 minutes
  // seedRanges.forEach(range => {
  //   for (let i = range.from; i < range.to; i++) {
  //     const location = seedToLocation(i);
  //     if (location < min) min = location;
  //   }
  // });

  // Part 2 (108956227)
  console.log("Part 2:", min);
};
