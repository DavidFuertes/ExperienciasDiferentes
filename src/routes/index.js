// Importamos las dependencias.
import express from 'express';

// Importamos los routers.
import { routers } from './usersRoutes.js';
//import { experienciasRouter } from './experienciasRoutes.js';

// Creamos un router y lo exportamos.
export const routes = express.Router();

// Usamos los routers de usuarios.
routes.use(routers);

