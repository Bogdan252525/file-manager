import os from 'os';

export const getEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

export const getCPUs = () => {
  const cpus = os.cpus();
  console.log(`Overall CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: ${cpu.model}, speed: ${cpu.speed} MHz`);
  });
};

export const getHomeDir = () => {
  const homeDir = os.homedir();
  console.log(`Home Directory: ${homeDir}`);
};

export const getUsername = () => {
  const username = os.userInfo().username;
  console.log(`Username: ${username}`);
};

export const getArch = () => {
  const architecture = os.arch();
  console.log(`Architecture: ${architecture}`);
};
