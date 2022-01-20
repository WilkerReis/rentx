import Category from '../../entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((categ) => categ.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    const listCategories = this.categories;
    return listCategories;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name, description,
    });

    this.categories.push(category);
  }
}

export default CategoriesRepositoryInMemory;
