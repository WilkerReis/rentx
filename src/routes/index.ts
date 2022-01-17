import { Router } from 'express';
import authenticateRoutes from './authenticate.routes';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const router = Router();

// passando como primeiro parâmetro a rota default, não precisa passar nos métodos
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authenticateRoutes);

export default router;
