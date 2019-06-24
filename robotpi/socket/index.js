import socketIO from 'socket.io';
import control, { start, exit } from './control.js';
import { exec } from 'child_process';

const started = new Date().toString();
let users = 0;
let lastConnected = null;

export default server => {
    const io = socketIO(server);

    io.on('connection', socket => {
        console.log('User connected.');

        // TODO: Not thread safe
        users++;
        if (users === 1) {
            start(process.argv[2] === 'nopi');
        }

        socket.on('started', () => {
            console.log('Got started from client');
            socket.emit('started', started);
        });

        socket.on('lastConnected', () => socket.emit(lastConnected));
        socket.on('status', () => {
            exec('./get_status.sh', (err, stdout, stderr) => {
                if (err) {
                    socket.emit('status', null);
                    return;
                }

                console.log(stdout);
            })

            /*socket.emit(JSON.stringify({
                throttled: null,
                temp: null,
                volts: {
                    core: null,
                    sdram_c: null,
                    sdram_i: null,
                    sdram_p: null
                }
            }));*/
        });

        // Setup controller parts
        control(socket);
    
        socket.on('disconnect', () => {
            console.log('User disconnected');
            users--;
            lastConnected = new Date().toString();
            if (users === 0) {
                exit();
            }
        });
    });

    return started;
}