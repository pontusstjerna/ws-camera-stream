import express from 'express';
import { config } from 'dotenv';
import start from './video';

config();

const PORT = process.env.PORT || 4000;

console.log('Starting stream server...');
const app = express();

start(app, PORT);
