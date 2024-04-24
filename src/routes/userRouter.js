// Importamos las dependencias.
import express from 'express';

// Aquí se importan las funciones controladoras finales.

import { newUserController } from '../controllers/users/newUserController.js';

import { validateUserController } from '../controllers/users/validateUserController.js';

import loginUserController from '../controllers/users/loginUserController.js';

import { changeUserPasswordController } from '../controllers/users/changeUserPasswordController.js';

// Aquí se importan las funciones controladoras intermedias.

// Creamos un enrutador con express, que permite definir rutas y manejar
// solicitudes HTTP específicas para esas rutas.
const userRouter = express.Router();

// Crear un usuario pendiente de activar.
userRouter.post('/register', newUserController);

// Validar a un usuario.
userRouter.get('/validate/:registrationCode', validateUserController);


// Middleware de login de usuario.
userRouter.post('/login', loginUserController);


// Cambio de contraseña
userRouter.put('/changePassword', changeUserPasswordController);

export { userRouter };
