import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const PORT = 5005;


console.log('Starting server...');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static('public'));

server.listen(PORT, () => console.log('Server successfully started on port ' + PORT));

io.on('connection', socket => {
    console.log('User connected.');
});

io.on('disconnect', () => {
    console.log('User disconnected.');
})