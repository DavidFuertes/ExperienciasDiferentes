// importamos express para crear el servidor
import express from 'express';
import fileUpload from 'express-fileupload';

// Importamos morgan para mostrar información de las peticiones
import morgan from 'morgan';

// Importamos cors para evitar problemas con las CORS
//import cors from 'cors';

// Importamos las rutas
import { routes } from './src/routes/index.js';

// Importamos los controladores de errores
import {
  notFoundController,
  errorController,
} from './src/controllers/errors/index.js';

// Obtenemos las variables de entorno
import { PORT } from './env.js';

//const db = getPool();
const app = express(); // crea servidor

const appPORT = PORT || 3000;

app.use(express.json()); // Milddeware para parsear el body
app.use(fileUpload());

app.use(morgan('dev')); // Milddewar de morgan

app.use(routes); // Milddewar que indica a express donde estan las rutas cuando esten hechas

app.use(notFoundController); // Milddewar de ruta no encontrada

app.use(errorController); //Milddewar de Error

app.listen(appPORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${appPORT}`);
});
