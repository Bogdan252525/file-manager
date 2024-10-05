import fs from 'fs';
import path from 'path';
import { pipeline as pipe } from 'stream/promises';
import { fileExists } from '../utils/fileExists.js';

export const readFile = async (fileName, currentDir) => {
  const fullPath = path.join(currentDir, fileName);
  try {
    const readStream = fs.createReadStream(fullPath, 'utf8');
    readStream.pipe(process.stdout);
    readStream.on('error', () => console.log('Operation failed'));
  } catch (error) {
    console.log('Operation failed');
  }
};

export const addFile = async (fileName, currentDir) => {
  const fullPath = path.join(currentDir, fileName);

  if (fileExists(fullPath)) {
    console.log('File already exists');
    return;
  }

  try {
    const writeStream = fs.createWriteStream(fullPath);
    writeStream.end();
    console.log('File added');
  } catch (error) {
    console.log('Operation failed');
  }
};

export const renameFile = async (oldFileName, newFileName, currentDir) => {
  const oldPath = path.join(currentDir, oldFileName);
  const newPath = path.join(currentDir, newFileName);

  if (fileExists(newPath)) {
    console.log('File already exists');
    return;
  }

  try {
    await fs.promises.rename(oldPath, newPath);
    console.log('File renamed');
  } catch {
    console.log('Operation failed');
  }
};

export const copyFile = async (fileName, destinationDir, currentDir) => {
  const fullPath = path.join(currentDir, fileName);
  let destinationPath;

  if (destinationDir === '.' || destinationDir === currentDir) {
    destinationPath = path.join(currentDir, `(copy)${fileName}`);

    let counter = 1;
    while (fs.existsSync(destinationPath)) {
      destinationPath = path.join(currentDir, `(copy${counter})${fileName}`);
      counter++;
    }
  } else {
    destinationPath = path.join(destinationDir, fileName);
  }
  try {
    const readStream = fs.createReadStream(fullPath);
    const writeStream = fs.createWriteStream(destinationPath);
    await pipe(readStream, writeStream);
    console.log('File copied');
  } catch (error) {
    console.log('Operation failed');
  }
};

export const moveFile = async (fileName, destinationDir, currentDir) => {
  try {
    if (destinationDir === currentDir || destinationDir === '.') {
      console.log('File moved');
    } else {
      await copyFile(fileName, destinationDir, currentDir);
      await deleteFile(fileName, currentDir);
      console.log('File moved');
    }
  } catch {
    console.log('Operation failed');
  }
};

export const deleteFile = async (fileName, currentDir) => {
  const fullPath = path.join(currentDir, fileName);
  try {
    await fs.promises.unlink(fullPath);
    console.log('File deleted');
  } catch (error) {
    console.log('Operation failed');
  }
};
