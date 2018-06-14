import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import * as controller from './control';

const PORT = 80;


console.log('Starting server...');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

const started = new Date().toString();
let users = 0;

app.use(express.static('public'));

server.listen(PORT, () => console.log(started + ': Server successfully started on port ' + PORT));

io.on('connection', socket => {
    console.log('User connected.');

    // TODO: Not thread safe
    users++;
    if (users == 1) {
        controller.start();
    }

    socket.on('forward', () => {
        controller.forward();
    });

    socket.on('reverse', () => {
        controller.reverse();
    });

    socket.on('left', () => {
        controller.left();
    });

    socket.on('right', () => {
        controller.right();
    });

    socket.on('rotLeft', () => {
        controller.rotLeft();
    });

    socket.on('rotRight', () => {
        controller.rotRight();
    });

    socket.on('stop', () => {
        controller.stop();
    });

    socket.on('started', () => {
        socket.emit('started', started);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        users--;
        if (users == 0) {
            controller.exit();
        }
    });
});