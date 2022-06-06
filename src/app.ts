import * as express from 'express';
import router from './router';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';

const swaggerSpec = YAML.load('../../Thunder-Chat-API.yaml');

const app: express.Application = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/', router);

export default app;
