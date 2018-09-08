import express from 'express';
import http from 'http';

import socket from './socket';
import startVideoServer from './video';

const PORT = 8080;

console.log('Starting server...');
const app = express();
const server = http.Server(app);
const started = socket(server);

app.use(express.static('public'));



server.listen(PORT, () => {
    startVideoServer(app, PORT);
    console.log(started + ': Base server successfully started on port ' + PORT);
});
