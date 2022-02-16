import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../../../errors/AppError';
import UsersRepository from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '../../../../config/auth';

interface IPayLoad {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  const usersTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayLoad;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!user) {
      throw new AppError('User does not exist!', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token.', 401);
  }
}
