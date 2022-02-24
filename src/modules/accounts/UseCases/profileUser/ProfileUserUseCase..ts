import { inject, injectable } from 'tsyringe';

import IUsersResponseDTO from '../../dtos/IUsersResponseDTO';
import UserMap from '../../mapper/UserMap';
import IUsersRepository from '../../repositories/IUsersRepository';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUsersResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export default ProfileUserUseCase;
