import bodyParser from 'body-parser';
import express from 'express';
import router from './app/routes/routes';
import config from './config/config';

const api: express.Application = express();

api.use(config);

api.use(router);

api.listen(3000, () => console.log('API Listening on port 3000!'))