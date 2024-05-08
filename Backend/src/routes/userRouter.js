// Importamos las dependencias.
import express from 'express';

// Aquí se importan las funciones controladoras finales.

import { newUserController } from '../controllers/users/newUserController.js';

import { validateUserController } from '../controllers/users/validateUserController.js';

import loginUserController from '../controllers/users/loginUserController.js';

import { changeUserPasswordController } from '../controllers/users/changeUserPasswordController.js';

import sendRecoverPassController from '../controllers/users/sendRecoverPassController.js';

import resetPasswordController from '../controllers/users/resetPasswordController.js';
import { updateUserController } from '../controllers/users/updateUserController.js';
import { userAuth } from '../middlewares/userAuth.js';
import { userInscribed } from '../controllers/users/userInscribed.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

// Aquí se importan las funciones controladoras intermedias.

// Creamos un enrutador con express, que permite definir rutas y manejar
// solicitudes HTTP específicas para esas rutas.
const userRouter = express.Router();

// Crear un usuario pendiente de activar.
userRouter.post('/register', newUserController);

// Validar a un usuario.
userRouter.get('/validate/:registrationCode', validateUserController);


userRouter.get('/userInscribed', userAuth, adminMiddleware, userInscribed);

// Middleware de login de usuario.
userRouter.post('/login', loginUserController);

// Cambio de contraseña
userRouter.put('/changePassword', userAuth, changeUserPasswordController);

// Enviar email de recuperación de contraseña.
userRouter.post('/password/forget', sendRecoverPassController);
userRouter.post('/password/recover', resetPasswordController);

userRouter.patch('/updateProfile', userAuth, updateUserController);

export { userRouter };
