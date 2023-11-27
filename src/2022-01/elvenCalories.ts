import { calorieMap } from "./input";

export const findElvenCalories = () => {
  const data = calorieMap;
  data.sort((a, b) => b.count - a.count);
  const elf = data.at(0);
  const elf2 = data.at(1);
  const elf3 = data.at(2);

  // Part 1
  if (elf) {
    console.log(`Part 1: Elf #${elf.index + 1} is carrying ${elf.count} kcal`);
  }

  // Part 2
  if (elf && elf2 && elf3) {
    const total = elf.count + elf2.count + elf3.count;
    console.log(
      `Part 2: Elves ${elf.index + 1}, ${elf2.index + 1} and ${
        elf3.index + 1
      } are carrying ${total} kcal`
    );
  }
};
