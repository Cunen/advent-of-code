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
  if (converters[name].length > 0) return;
  array.forEach((row) => {
    const split = row.split(" ");
    if (split.length <= 2) return;
    const base = Number(split[0]);
    const min = Number(split[1]);
    const max = Number(split[2]) + min;
    converters[name].push([base, min, max]);
  });
};

const getPossibleRanges = (
  next: number[][],
  ranges: {
    from: number;
    to: number;
  }[]
) => {
  const arr = [...next];
  const min = next.reduce((sum, n) => (n[0] < sum ? n[0] : sum), Infinity);
  if (min > 0) arr.push([0, 0, min]);
  return arr
    .map((range) => {
      const from = range[0];
      const to = range[0] + range[2];
      const isInRange = ranges
        .map((r) => {
          const topEnd = from <= r.to && to >= r.to;
          const bottomEnd = from <= r.from && to >= r.from;
          if (topEnd || bottomEnd) {
            return {
              fDiff: Math.max(r.from - from, 0),
              tDiff: Math.max(to - r.to, 0),
            };
          }
          return null;
        })
        .filter(Boolean) as {
        fDiff: number;
        tDiff: number;
      }[];
      if (isInRange.length > 0) {
        const fMax = Math.min(...isInRange.map((ir) => ir.fDiff));
        const tMax = Math.min(...isInRange.map((ir) => ir.tDiff));
        const adjFrom = range[1] - fMax;
        const adjTo = range[1] + range[2] - tMax;
        return { from: adjFrom, to: adjTo };
      }
      return null;
    })
    .filter(Boolean) as {
    from: number;
    to: number;
  }[];
};

export const seedFertilizer = () => {
  const array = prodInput.split("\n\n");

  const seeds: string[] = array.at(0)?.split(" ") || [];
  seeds.shift();
  const seedNums = seeds.map(Number);

  // Part 1
  const seedRanges: { from: number; to: number }[] = [];
  seedNums.forEach((num, i) => {
    if (i % 2 === 1) {
      const from = seedNums[i - 1];
      const to = num + seedNums[i - 1];
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

  // Part 1 (322 500 873)
  console.log("Part 1:", Math.min(...seedNums.map(seedToLocation)));

  const lowestLocation = converters["humidityToLocation"].reduce(
    (sum, array) => (array[0] < sum ? array[0] : sum),
    Infinity
  );

  const locationRanges = [{ from: 0, to: lowestLocation }];
  const humidityRanges = getPossibleRanges(
    converters["temperatureToHumidity"],
    locationRanges
  );
  const temperatureRanges = getPossibleRanges(
    converters["lightToTemperature"],
    humidityRanges
  );
  const lightRanges = getPossibleRanges(
    converters["waterToLight"],
    temperatureRanges
  );
  const waterRanges = getPossibleRanges(
    converters["fertilizerToWater"],
    lightRanges
  );
  const fertilizerRanges = getPossibleRanges(
    converters["soilToFertilizer"],
    waterRanges
  );
  const soilRanges = getPossibleRanges(
    converters["seedToSoil"],
    fertilizerRanges
  );

  
  const lowestLocations = soilRanges.map(soilRange => {
    const seedLocation = seedToLocation(soilRange.from);
    const smaller = seedLocation < lowestLocation;
    const inRange = seedRanges.some(({ from, to }) => {
      return soilRange.from >= from && soilRange.from <= to
    });
    return smaller && inRange ? seedLocation : Infinity;
  });

  // Part 2 (108 956 227)
  console.log("Part 2:", Math.min(...lowestLocations));
};
