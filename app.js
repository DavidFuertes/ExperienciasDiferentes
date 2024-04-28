// importamos express para crear el servidor
import express from 'express';
import fileUpload from 'express-fileupload';

import 'dotenv/config.js';

// Importamos morgan para mostrar información de las peticiones
import morgan from 'morgan';

// Importamos cors para evitar problemas con las CORS
//import cors from 'cors';

// Importamos las rutas
//import { routes } from './src/routes/index.js';
import { experiencesRouter } from './src/routes/experiencesRouter.js';
import { userRouter } from './src/routes/userRouter.js';

// Importamos los controladores de errores
import {
    notFoundController,
    errorController,
} from './src/controllers/errors/index.js';

// Obtenemos las variables de entorno
//import { PORT } from './env.js';

//const db = getPool();
const app = express(); // crea servidor

const port = process.env.PORT ?? 3000;

app.use(express.json()); // Milddeware para parsear el body
app.use(fileUpload({ useTempFiles: true }));

app.use(morgan('dev')); // Milddeware de morgan

//app.use(routes); // Milddeware que indica a express donde estan las rutas cuando esten hechas
app.use('/api/users', userRouter);
app.use('/api/experiences', experiencesRouter);
app.use(notFoundController); // Milddeware de ruta no encontrada

app.use(errorController); //Milddeware de Error

app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});
