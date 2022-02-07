/* eslint-disable no-undef */
import AppError from '../../../../shared/errors/AppError';
import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import CreateCarUseCase from './CreateCarUseCase';

let createCarUSeCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUSeCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new Car', async () => {
    const car = await createCarUSeCase.execute({
      name: 'Car Name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with an existing license plate.', async () => {
    await createCarUSeCase.execute({
      name: 'Car1',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    await expect(createCarUSeCase.execute({
      name: 'Car2',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })).rejects.toEqual(new AppError('Car already exists!'));
  });

  it('Should be able to create a car with available true by default.', async () => {
    const car = await createCarUSeCase.execute({
      name: 'Car Available',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'abd-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
