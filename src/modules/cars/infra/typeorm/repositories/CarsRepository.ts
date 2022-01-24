import { getRepository, Repository } from 'typeorm';
import ICarsRepository from '../../../repositories/ICarsRepository';
import Car from '../entities/Car';
import ICreateCarDTO from '../../../dtos/ICreateCarDTO';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(
    {
      brand, category_id, daily_rate, description, fine_amount, license_plate, name,
    }:ICreateCarDTO,
  ): Promise<Car> {
    const car = this.repository.create({
      brand, category_id, daily_rate, description, fine_amount, license_plate, name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }

  async findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export default CarsRepository;
