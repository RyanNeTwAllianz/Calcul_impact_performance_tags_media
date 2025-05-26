import { spawn } from 'child_process'

const ExecutePython = (argIteration) => {
    const pythonProcess = spawn('python', ['main.py', '--mode', argIteration])

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Le processus Python s'est terminé avec le code ${code}`);
    });
}

export default ExecutePython