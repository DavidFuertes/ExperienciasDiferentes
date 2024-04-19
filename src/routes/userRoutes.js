// Importamos las dependencias.
import express from 'express';

// Aquí se importan las funciones controladoras finales.
import { loginUserController } from '../controllers/users/index.js';

// Aquí se importan las funciones controladoras intermedias.

// Creamos un enrutador con express, que permite definir rutas y manejar
// solicitudes HTTP específicas para esas rutas.
const router = express.Router();


// Middleware de login de usuario.
router.post('/users/login', loginUserController);