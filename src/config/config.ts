import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import db from '../database/database';
import * as sqlite3 from 'sqlite3';

const config: express.Application = express();

const corsOptions = {
    exposedHeaders: ['x-access-token']
};

config.use(cors(corsOptions));
config.use(bodyParser.json());

config.use((req: sqlite3, res, next) => {
    req.db = db;
    next();
});

config.use((req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log('####################################');
    if (token) {
        console.log('A token is send by the application');
        console.log('Token value is ' + token);
    } else {
        console.log('No token is send by the the application');
    }
    console.log('####################################');
    next();
});

export default config;