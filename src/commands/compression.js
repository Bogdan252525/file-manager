import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline as pipe } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

export const compressFile = async (fileName, destPath, currentDir) => {
  const filePath = path.join(currentDir, fileName);
  let destPathAndName;

  if (destPath === '.') {
    destPathAndName = path.join(currentDir, `${fileName}.br`);
  } else {
    destPathAndName = path.join(destPath, `${fileName}.br`);
  }

  const brotli = createBrotliCompress();
  const source = createReadStream(filePath);
  const destination = createWriteStream(destPathAndName);

  try {
    await pipe(source, brotli, destination);
    console.log('File compressed');
  } catch (error) {
    console.log('Operation failed');
  }
};

export const decompressFile = async (fileName, destPath, currentDir) => {
  const filePath = path.join(currentDir, fileName);
  let destPathAndName;

  if (destPath === '.') {
    destPathAndName = path.join(currentDir, fileName.slice(0, -3));
  } else {
    destPathAndName = path.join(destPath, fileName.slice(0, -3));
  }

  const brotliDecompress = createBrotliDecompress();
  const source = createReadStream(filePath);
  const destination = createWriteStream(destPathAndName);

  try {
    await pipe(source, brotliDecompress, destination);
    console.log('File decompressed');
  } catch (error) {
    console.log('Operation failed');
  }
};
