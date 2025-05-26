import GetArgsFromCmd from "./utils/GetArgsFromCmd.js";
import { spawn } from "child_process";


const argIteration = GetArgsFromCmd()
console.log({argIteration})

const pythonProcess= spawn('python', ['test.py', '--mode', argIteration])

pythonProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Le processus Python s'est terminé avec le code ${code}`);
});