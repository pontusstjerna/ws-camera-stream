import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import * as controller from './control';

const PORT = 5005;


console.log('Starting server...');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

const started = new Date().toString();

app.use(express.static('public'));

server.listen(PORT, () => console.log(started + ': Server successfully started on port ' + PORT));

io.on('connection', socket => {
    console.log('User connected.');

    socket.on('forward', () => {
        controller.forward();
    });

    socket.on('backward', () => {
        controller.backward();
    });

    socket.on('left', () => {
        controller.left();
    });

    socket.on('right', () => {
        controller.right();
    });

    socket.on('stop', () => {
        controller.stop();
    });

    socket.on('started', () => {
        socket.emit('started', started);
    });
});

io.on('disconnect', () => {
    console.log('User disconnected.');
})
