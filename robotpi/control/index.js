import PythonShell from 'python-shell';

const shell = new PythonShell('python/controller.py');
shell.send('setMotorRightt(23)');

shell.on('message', message => console.log('From Python: ' + message));

shell.end((err, code, signal) => {
    if (err) throw err;
    console.log('Python exited. Code was ' + code);
    console.log('Exit signal was ' + signal);
});

export const forward = () => {

}
