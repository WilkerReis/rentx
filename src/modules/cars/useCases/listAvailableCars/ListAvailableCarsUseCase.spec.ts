/* eslint-disable no-undef */
import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase:ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars.', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car brand',
      name: 'Car 1',
      category_id: 'category_id',
      daily_rate: 140.00,
      fine_amount: 100,
      license_plate: 'DEF-1212',
      description: 'Car description',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by brand.', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car Brand test',
      name: 'Car 2',
      category_id: 'category_id',
      daily_rate: 140.00,
      fine_amount: 100,
      license_plate: 'DEF-1212',
      description: 'Car description',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car Brand test',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by name.', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car Brand test',
      name: 'Car 3',
      category_id: 'category_id',
      daily_rate: 140.00,
      fine_amount: 100,
      license_plate: 'DEF-1212',
      description: 'Car description',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car 3',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by category.', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car Brand test',
      name: 'Car 2',
      category_id: '12345',
      daily_rate: 140.00,
      fine_amount: 100,
      license_plate: 'DEF-1212',
      description: 'Car description',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
