import { Router } from 'express';

import ResetPasswordUserController from '../../../../modules/accounts/UseCases/resetPasswordUser/ResetPasswordUserController';
import SendForgotPasswordMailController from '../../../../modules/accounts/UseCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export default passwordRoutes;
