import { prodInput } from "./input";

interface Pipe {
  id: string;
  rate: number;
  connections: Pipe[];
}

type PipeRecord = Record<string, Pipe>;

const pipeRecord: PipeRecord = {};

const bestPipes: Pipe[] = [];

let peakPressure: Record<number, number> = {};

const runPipe = (
  pipe: Pipe,
  buildup = 0,
  pressure = 0,
  step = 1,
  valves = "",
  paths = ""
): number[] => {
  let newPressure = pressure + buildup;

  if (newPressure > peakPressure[step]) {
    peakPressure[step] = newPressure;
  } else if (!peakPressure[step]) {
    peakPressure[step] = newPressure;
  }

  let newBuildup = buildup;
  let newValves = valves;
  let newPaths = (paths += pipe.id + "-");

  const unopenedValve = pipe.rate > 0 && !newValves.includes(pipe.id);

  // Find potential unvisited connections
  const potentialConnections = pipe.connections.filter(
    (connection) => !newPaths.includes(connection.id)
  );

  const allValvesOpen = bestPipes.length * 3 === newValves.length;

  // EXTERMINATE THE WEAK
  const elim5 = step === 6 && peakPressure[5] > newPressure;
  const elim10 = step === 11 && peakPressure[10] > newPressure;
  const elim15 = step === 16 && peakPressure[15] > newPressure;
  const elim20 = step === 21 && peakPressure[20] > newPressure;
  const elim25 = step === 26 && peakPressure[25] > newPressure;
  if (elim5 || elim10 || elim15 || elim20 || elim25) return [];

  if (
    allValvesOpen ||
    step >= 30 ||
    (potentialConnections.length <= 0 && !unopenedValve)
  ) {
    const remainingTime = 30 - step;
    const remainingPressure = remainingTime * newBuildup;
    return [newPressure + remainingPressure];
  }

  let unopenedPath: number[] = [];
  // Open a new Valve
  if (unopenedValve) {
    unopenedPath = runPipe(
      pipe,
      newBuildup + pipe.rate,
      newPressure,
      step + 1,
      newValves + pipe.id + "-",
      pipe.id + "-"
    );
  }

  const asd = potentialConnections.flatMap((connection) => {
    return runPipe(
      connection,
      newBuildup,
      newPressure,
      step + 1,
      newValves,
      newPaths
    );
  });

  if (unopenedPath.length > 0) asd.push(...unopenedPath);

  return asd;
};

interface Elephant {
  valves: string;
  step: number;
  pressure: number;
  buildup: number;
}

let targetValves = 7;

const runPipeAlternate = (
  pipe: Pipe,
  buildup = 0,
  pressure = 0,
  step = 1,
  valves = "",
  paths = ""
): Elephant[] => {
  let newPressure = pressure + buildup;

  if (newPressure > peakPressure[step]) {
    peakPressure[step] = newPressure;
  } else if (!peakPressure[step]) {
    peakPressure[step] = newPressure;
  }

  let newBuildup = buildup;
  let newValves = valves;
  let newPaths = (paths += pipe.id + "-");

  const unopenedValve = pipe.rate > 0 && !newValves.includes(pipe.id);

  // Find potential unvisited connections
  const potentialConnections = pipe.connections.filter(
    (connection) => !newPaths.includes(connection.id)
  );

  const enoughValvesOpen = newValves.length / 3 >= targetValves;

  // EXTERMINATE THE WEAK
  const elim5 = step === 6 && peakPressure[5] > newPressure;
  const elim10 = step === 11 && peakPressure[10] > newPressure;
  const elim15 = step === 16 && peakPressure[15] > newPressure;
  const elim20 = step === 21 && peakPressure[20] > newPressure;
  const elim25 = step === 26 && peakPressure[25] > newPressure;
  if (elim5 || elim10 || elim15 || elim20 || elim25) return [];

  if (step >= 26) {
    return [];
  }

  if (enoughValvesOpen) {
    const remainingTime = 26 - step;
    const remainingPressure = remainingTime * newBuildup;
    return [
      {
        valves: newValves,
        step,
        pressure: newPressure + remainingPressure,
        buildup: newBuildup,
      },
    ];
  }

  if (potentialConnections.length <= 0 && !unopenedValve) {
    return [];
  }

  let unopenedPath: Elephant[] = [];
  // Open a new Valve
  if (unopenedValve) {
    unopenedPath = runPipeAlternate(
      pipe,
      newBuildup + pipe.rate,
      newPressure,
      step + 1,
      newValves + pipe.id + "-",
      pipe.id + "-"
    );
  }

  const asd = potentialConnections.flatMap((connection) => {
    return runPipeAlternate(
      connection,
      newBuildup,
      newPressure,
      step + 1,
      newValves,
      newPaths
    );
  });

  if (unopenedPath.length > 0) asd.push(...unopenedPath);

  return asd;
};

export const probosciedaVolcanium = () => {
  const generatedPipes = prodInput.split("\n").map((valve) => {
    const name = valve.substring(6, 8);
    const connectedNames =
      valve.split("to valves ").at(1)?.split(", ") ||
      valve.split("to valve ").at(1)?.split(", ") ||
      [];
    const rate = Number(valve.split("rate=").at(1)?.split(";").at(0) ?? 0);
    pipeRecord[name] = { id: name, rate, connections: [] };
    if (rate > 0) {
      bestPipes.push(pipeRecord[name]);
    }
    return { name, connectedNames };
  });

  generatedPipes.forEach(({ name, connectedNames }) => {
    connectedNames.forEach((n) =>
      pipeRecord[name].connections.push(pipeRecord[n])
    );
  });

  // Part 1
  const pressure = runPipe(pipeRecord["AA"]);
  console.log("Part 1:", Math.max(...pressure));

  // Part 2
  targetValves = 6;
  peakPressure = {};
  const runsWith6Valves = runPipeAlternate(pipeRecord["AA"]);
  targetValves = 5;
  peakPressure = {};
  const runsWith5Valves = runPipeAlternate(pipeRecord["AA"]);

  let eleMax = 0;

  runsWith6Valves.forEach((run) => {
    const valves = run.valves.split("-").filter(Boolean);
    const pairs = runsWith5Valves.filter((pair) => {
      const pairValves = pair.valves.split("-").filter(Boolean);
      return !valves.some((v) => pairValves.includes(v));
    });
    pairs.forEach((pairing) => {
      const max = run.pressure + pairing.pressure;
      if (max > eleMax) eleMax = max;
    });
  });

  // (5 & 6) 2576 is correct
  console.log("Part 2:", eleMax);
};
