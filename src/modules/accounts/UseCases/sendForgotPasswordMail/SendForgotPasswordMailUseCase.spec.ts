/* eslint-disable no-undef */
import MailProviderInMemory from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import DayjsDateProvider from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';
import AppError from '../../../../shared/errors/AppError';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send mail to change forgot password', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('Should be able to send a mail to change forgot password to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '664168',
      email: 'avzonbop@ospo.pr',
      name: 'Blanche Curry',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('avzonbop@ospo.pr');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('ka@uj.gr'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'wilkerdsores@ospo.pr',
      name: 'Blarry Açafrão',
      password: '5678',
    });

    await sendForgotPasswordMailUseCase.execute('wilkerdsores@ospo.pr');

    expect(generateTokenMail).toBeCalled();
  });
});
