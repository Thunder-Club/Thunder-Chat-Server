import * as express from 'express';
import router from './router';

const app: express.Application = express();

app.use(express.json());
app.use('/', router);

export default app;
