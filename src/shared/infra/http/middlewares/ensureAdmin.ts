import { Request, Response, NextFunction } from 'express';
import UsersRepository from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '../../../errors/AppError';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError('User is not Admin!');
  }

  return next();
}
