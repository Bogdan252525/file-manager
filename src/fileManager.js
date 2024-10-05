import os from 'os';
import path from 'path';
import readline from 'readline';
import { homedir } from 'os';
import {helper} from './utils/helper.js';
import {
  navigateUp, changeDirectory, listDirectory
} from './commands/navigation.js';
import {
  readFile, addFile, renameFile, copyFile, moveFile, deleteFile
} from './commands/fileOperations.js';
import {
  getEOL, getCPUs, getHomeDir, getUsername, getArch
} from './commands/osInfo.js';
import {
  compressFile, decompressFile
} from './commands/compression.js';
import { calculateFileHash } from './commands/hashing.js'

const args = process.argv.slice(2);
const username = args.find(arg => arg.startsWith('--username='))
  ?.split('=')[1] || 'Anonymous';

console.log(`Welcome to the File Manager, ${username}!\nType "help" to see example commands`);

let currentDir = homedir();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `You are currently in ${currentDir}\n> `
});

rl.prompt();

rl.on('line', async (input) => {
  const [command, ...params] = input.trim().split(' ');

  try {
    switch (command) {
			case 'help':
				helper();
				break;
      case 'up':
        currentDir = navigateUp(currentDir);
        break;
      case 'cd':
        currentDir = await changeDirectory(params[0], currentDir);
        break;
      case 'ls':
        await listDirectory(currentDir);
        break;
      case 'cat':
        await readFile(params[0], currentDir);
        break;
      case 'add':
        await addFile(params[0], currentDir);
        break;
      case 'rn':
        await renameFile(params[0], params[1], currentDir);
        break;
      case 'cp':
        await copyFile(params[0], params[1], currentDir);
        break;
      case 'mv':
        await moveFile(params[0], params[1], currentDir);
        break;
      case 'rm':
        await deleteFile(params[0], currentDir);
        break;
      case 'os':
        switch (params[0]) {
          case '--EOL':
            getEOL();
            break;
          case '--cpus':
            getCPUs();
            break;
          case '--homedir':
            getHomeDir();
            break;
          case '--username':
            getUsername();
            break;
          case '--architecture':
            getArch();
            break;
          default:
            console.log('Invalid input');
        }
        break;
      case 'hash':
        await calculateFileHash(params[0], currentDir);
        break;
      case 'compress':
        await compressFile(params[0], params[1], currentDir);
        break;
      case 'decompress':
        await decompressFile(params[0], params[1], currentDir);
        break;
      case '.exit':
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        rl.close();
        return;
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.error('Operation failed');
  }

  rl.setPrompt(`You are currently in ${currentDir}\n> `);
  rl.prompt();
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
