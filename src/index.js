import express from 'express';
import http from 'http';
import { config } from 'dotenv';
import start from './video';

config();

const PORT = process.env.PORT || 4000;

console.log('Starting stream server...');
const app = express();
const server = http.Server(app);

server.listen(4000, () => {
    start(app, PORT);
    console.log(': Base server successfully started on port ' + PORT);
});
