import { prodInput } from "./input";

const cd = "$ cd ";
const cdBack = "$ cd ..";
const ls = "$ ls";
const dir = "dir ";

interface File {
  name: string;
  size: number;
}

interface Folder {
  name: string;
  level: number;
  files: File[];
  folders: Folder[];
  prev?: Folder;
  size: number;
}

const createFolder = (name: string, level: number, current: Folder) => {
  return {
    name,
    level,
    files: [],
    folders: [],
    prev: current,
    size: 0,
  };
};

const recursionPush = (folder: Folder, size: number) => {
  folder.size += size;
  if (folder.prev) recursionPush(folder.prev, size);
  return;
};

const recursionCount = (folders: Folder[], count = 0): number => {
  const newFolders: Folder[] = [];
  let loopCount = 0;
  folders.forEach((folder) => {
    if (folder.size <= 100000) loopCount += folder.size;
    newFolders.push(...folder.folders);
  });
  if (newFolders.length <= 0) return count + loopCount;
  return recursionCount(newFolders, count + loopCount);
};

const recursionFind = (
  folders: Folder[],
  size: number,
  closestFolder: Folder
): Folder => {
  let newClosestFolder = closestFolder;
  const newFolders: Folder[] = [];
  folders.forEach((f) => {
    if (f.size > size && f.size < newClosestFolder.size) {
      newClosestFolder = f;
    }
    newFolders.push(...f.folders);
  });
  if (newFolders.length <= 0) return newClosestFolder;
  return recursionFind(newFolders, size, newClosestFolder);
};

export const noSpaceOnDevice = () => {
  const root: Folder = {
    name: "root",
    level: 0,
    files: [],
    folders: [],
    size: 0,
  };

  let currentFolder = root;

  const commands = prodInput.split("\n");

  let level = 0;

  commands.forEach((command) => {
    // Traverse Backwards ($ cd ..)
    if (command.startsWith(cdBack) && currentFolder.prev) {
      currentFolder = currentFolder.prev;
      level--;
    }
    // Traverse inwards ($cd dirname)
    else if (command.startsWith(cd)) {
      level++;
      const folderName = command.replace(cd, "");
      const fldr = currentFolder.folders.find((f) => f.name === folderName);
      if (!fldr) {
        const newFolder = createFolder(folderName, level, currentFolder);
        currentFolder.folders.push(newFolder);
        currentFolder = newFolder;
      } else currentFolder = fldr;
    }
    // List files ($ ls)
    else if (command.startsWith(ls)) {
      // Nothing for now
    }
    // A folder was listed (dir)
    else if (command.startsWith(dir)) {
      const folderName = command.replace(dir, "");
      const fldr = currentFolder.folders.find((f) => f.name === folderName);
      if (!fldr) {
        const newFolder = createFolder(folderName, level, currentFolder);
        currentFolder.folders.push(newFolder);
      }
    }
    // A file was listed
    else {
      const [size, name] = command.split(" ");
      const foundFile = currentFolder.files.find((f) => f.name === name);
      if (!foundFile) {
        // Add a new file
        const sz = Number(size);
        recursionPush(currentFolder, sz);
        currentFolder.files.push({
          size: sz,
          name,
        });
      }
    }
  });

  // Part 1
  console.log("Part 1:", recursionCount(root.folders));

  // Part 2
  const diskSpace = 70000000;
  const requiredSpace = 30000000;
  const usedSpace = root.size;
  const shouldFreeUp = usedSpace + requiredSpace - diskSpace;
  console.log("Part 2:", recursionFind(root.folders, shouldFreeUp, root).size);
};
