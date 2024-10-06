import { readdir, stat } from 'fs/promises';
import path from 'path';

export const navigateUp = (currentDir) => {
  const newDir = path.dirname(currentDir);
  if (newDir !== currentDir) {
    return newDir;
  } else {
    console.log("You can't go upper than the root directory");
    return currentDir;
  }
};

export const changeDirectory = async (dir, currentDir) => {
  const newDir = path.isAbsolute(dir) ? dir : path.resolve(currentDir, dir);
  try {
    await readdir(newDir);
    return newDir;
  } catch {
    console.log('Operation failed');
    return currentDir;
  }
};

const greenText = (text) => `\x1b[32m'${text}'\x1b[0m`;

export const listDirectory = async (currentDir) => {
  try {
    const files = await readdir(currentDir);
    
    const fileInfoArray = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(currentDir, file);
        const fileStat = await stat(filePath);
        return {
          name: file,
          type: fileStat.isDirectory() ? 'directory' : 'file',
        };
      })
    );

    fileInfoArray.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'directory' ? -1 : 1;
    });

		console.log('----------------------------------------------------------------------------------');
    console.log('|(index)|                           Name                           |    Type     |');
    console.log('----------------------------------------------------------------------------------');

    fileInfoArray.forEach((fileInfo, index) => {
      console.log(`| ${index.toString().padEnd(5)} | ${greenText(fileInfo.name.padEnd(54))} | ${greenText(fileInfo.type.padEnd(9))} |`);
    });
		console.log('----------------------------------------------------------------------------------');
  } catch (error) {
    console.error('Operation failed');
  }
};
