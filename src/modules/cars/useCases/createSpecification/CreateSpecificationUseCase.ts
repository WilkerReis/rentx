import { inject, injectable } from 'tsyringe';
import AppError from '../../../../shared/errors/AppError';
import SpecificationRepository from '../../infra/typeorm/repositories/SpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: SpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}

export default CreateSpecificationUseCase;
