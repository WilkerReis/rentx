import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '../modules/cars/useCases/createCategory/CreateCategoryController';
import ImportCategoryController from '../modules/cars/useCases/importCategory/ImportCategoryController';
import ListCategoriesController from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

// Cria a categoria
categoriesRoutes.post('/', createCategoryController.handle);

// Lista as categorias
categoriesRoutes.get('/', listCategoriesController.handle);

// upload de arquivo e insere as categorias com name e description do documento
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export default categoriesRoutes;
