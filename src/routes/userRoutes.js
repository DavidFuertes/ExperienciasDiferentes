// Importamos las dependencias.
import express from 'express';

// Aquí se importan las funciones controladoras finales.

import { newUserController } from '../controllers/users/newUserController.js';

import { validateUserController } from '../controllers/users/validateUserController.js';

import { loginUserController } from '../controllers/users/index.js';

import { changeUserPasswordController } from '../controllers/users/changeUserPasswordController.js';

// Aquí se importan las funciones controladoras intermedias.

// Creamos un enrutador con express, que permite definir rutas y manejar
// solicitudes HTTP específicas para esas rutas.
export const router = express.Router();

// Crear un usuario pendiente de activar.
router.post('/users/register', newUserController);

// Validar a un usuario.
router.get('/users/validate/:registrationCode', validateUserController);


// Middleware de login de usuario.
router.post('/users/login', loginUserController);


// Cambio de contraseña
router.put('/users/changePassword', changeUserPasswordController);
