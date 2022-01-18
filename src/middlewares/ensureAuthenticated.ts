import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UsersRepository from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayLoad {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '521f998b592a54179cec101bd2342abb',
    ) as IPayLoad;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exist!');
    }

    next();
  } catch {
    throw new Error('Invalid token.');
  }
}
