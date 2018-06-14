import PythonShell from 'python-shell';

const shell = new PythonShell('python/controller.py');
shell.send('setMotorRightt(23)');

shell.on('message', message => console.log('From Python: ' + message));

shell.end((err, code, signal) => {
    if (err) throw err;
    console.log('Python exited with code ' + code);
});



export let power = 1;

export const forward = () => {
    setMotorLeft(power);
    setMotorRight(power);
}

export const left = () => {
    setMotorLeft(power);
    setMotorRight(power * 0.1);
}

export const right = () => {
    setMotorLeft(power * 0.1);
    setMotorRight(power);
}

export const backward = () => {
    setMotorLeft(-power);
    setMotorRight(-power);
}

export const stop = () => {
    setMotorLeft(0);
    setMotorRight(0);
}

const setMotorRight = pwr => {
    shell.send('setMotorRight(' + pwr + ')');
}

const setMotorLeft = pwr => {
    shell.send('setMotorLeft(' + pwr + ')');
}
