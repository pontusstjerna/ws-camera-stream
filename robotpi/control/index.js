import PythonShell from 'python-shell';

const shell = new PythonShell('python/controller.py');
//shell.send('setMotorRightt(23)');

shell.on('message', message => console.log('From Python: ' + message));

export const forward = () => {

}
