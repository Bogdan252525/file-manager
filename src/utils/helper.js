export const helper = () => {
	console.log("Examples of commands for MAC\n\nStart the application: npm run start -- --username=your_username\nExamples of commands for MAC: help\n\nOne level up: up (cd ..)\nGo to a specific directory: cd ./directory\nGo to the mounted disk: cd /Volumes/Transcend\nList of files: ls\n\nRead a file: cat file.txt\nAdd file: add file.txt\nRename a file: rn file1.txt file2.txt\nCopy a file: cp file.txt /directory (cp file.txt .)\nMove a file: mv file.txt /directory\nDelete the file: rm file.txt\n\nZip a file: compress file.txt /directory (compress file.txt .)\nUnzip a file: decompress file.br /directory (decompress file.br .)\nHash for a file: hash file.txt\n\nDefault system End-Of-Line: os --EOL\nCPUs info: os --cpus\nHome directory: os --homedir\nSystem user name: os --username\n\nExit the program: .exit (ctrl + c)\n");
}