import fs from 'fs';
import { parse } from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  loadCategories(file: any): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // lê o arquivo
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];

      // Writable com default para quebrar padrão de "," que é o caso do file
      const parseFile = parse();

      // passa do Readable stream para o parseFile que é Writable
      stream.pipe(parseFile);

      // cada line é um chunk (pedaço) da stream
      parseFile.on('data', async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description,
        });
      })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: any): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export default ImportCategoryUseCase;
