import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import './database';

import './shared/container';

import router from './routes';

const app = express();

app.use(express.json());

// swagger na rota '/api-docs', passando o server swagger Ui
// e o setup passando o json que constrói o swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333);
