/* eslint-disable no-undef */
import AppError from '../../../../shared/errors/AppError';
import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('Should not be able to add a new specification to a non-existent car', async () => {
    const car_id = '123';
    const specifications_id = ['54321'];

    await expect(createCarSpecificationUseCase.execute({ car_id, specifications_id })).rejects.toEqual(new AppError('Car does not exists!'));
  });

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Available',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'abd-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'testDescription',
      name: 'testName',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute(
      { car_id: car.id, specifications_id },
    );

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
