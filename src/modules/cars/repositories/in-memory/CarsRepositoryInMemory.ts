import ICreateCarDTO from '../../dtos/ICreateCarDTO';
import Car from '../../infra/typeorm/entities/Car';
import ICarsRepository from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand, name, category_id, daily_rate, fine_amount, license_plate, description, id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      name,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      description,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Car[]> {
    const cars = this.cars
      .filter((car) => car.available === true)
      .filter(
        (car) => (brand && car.brand) === brand
    || (category_id && car.category_id === category_id)
    || (name && car.name === name),
      );

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export default CarsRepositoryInMemory;
