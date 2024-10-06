import fs from 'fs';

export const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};