import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';

export const calculateFileHash = async (fileName, currentDir) => {
  const hash = createHash('sha256');
  const destPathAndName = path.join(currentDir, fileName);

  const source = createReadStream(destPathAndName);

  try {
    await pipeline(source, async function* (source) {
      for await (const chunk of source) {
        hash.update(chunk);
      }
    });
    const result = hash.digest('hex');
    console.log(result);
  } catch (error) {
    console.log('Operation failed');
  }
};
