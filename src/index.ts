import express from 'express';

const api: express.Application = express();



api.listen(3000, () => console.log('API Listening on port 3000!'))