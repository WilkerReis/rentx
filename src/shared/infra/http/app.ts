import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import createConnectionImplemented from '../typeorm';

import '../../container';

import AppError from '../../errors/AppError';
import router from './routes';
import upload from '../../../config/upload';

createConnectionImplemented();
const app = express();

app.use(express.json());

// swagger na rota '/api-docs', passando o server swagger Ui
// e o setup passando o json que constrói o swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export default app;
