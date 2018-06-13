import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

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
        console.log('Forward registered.');
    });

    socket.on('backward', () => {
        console.log('Backward registered.');
    });

    socket.on('left', () => {
        console.log('Left registered.');
    });

    socket.on('right', () => {
        console.log('Right registered.');
    });

    socket.on('started', () => {
        socket.emit('started', started);
    })
});

io.on('disconnect', () => {
    console.log('User disconnected.');
})