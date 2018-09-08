import socketIO from 'socket.io';
import control, { start, exit } from './control.js';
import { authorize } from '../util/auth.js';

const started = new Date().toString();
let users = 0;

export default server => {
    const io = socketIO(server);

    io.on('connection', socket => {
        console.log('User connected.');

        const { authorization } = socket.handshake.headers;
        console.log(authorization);
        if (!authorize(authorization)) {
            console.log('Unauthorized access!!');
            socket.emit('unauthorized');
            return;
        }
    
        // TODO: Not thread safe
        users++;
        if (users == 1) {
            start(process.argv[4] === 'nopi');
        }
    
        socket.on('started', () => {
            socket.emit('started', started);
        });

        // Setup controller parts
        control(socket);
    
        socket.on('disconnect', () => {
            console.log('User disconnected');
            users--;
            if (users == 0) {
                exit();
            }
        });
    });

    return started;
}