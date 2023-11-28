import { prodInput } from "./input";

const cd = '$ cd ';
const cdBack = '$ cd ..';

const fileSystem: string[] = [];

export const noSpaceOnDevice = () => {
  const commands = prodInput.split("\n");

  commands.forEach(command => {
    // Traverse Backwards
    if (command.startsWith(cdBack)) {

    }
    // Traverse inwards
    else if (command.startsWith(cd)) {

    }
  });

  console.log(fileSystem);
};
