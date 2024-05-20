import 'dotenv/config.js';
import express from 'express';
import fileUpload from 'express-fileupload';
import 'dotenv/config.js'; // Importamos dotenv para cargar variables de entorno desde un archivo .env
import morgan from 'morgan'; // Importamos morgan para mostrar información de las peticiones
import cors from 'cors'; // Importamos cors para evitar problemas con las CORS
import { experiencesRouter } from './src/routes/experiencesRouter.js'; // Importamos las rutas de experiencias
import { userRouter } from './src/routes/userRouter.js'; // Importamos las rutas de usuarios
import {
    notFoundController,
    errorController,
} from './src/controllers/errors/index.js';
// Importamos el controlador de errores

const app = express(); // Crea servidor

app.use(cors()); // Middleware de cors
app.use(express.json()); // Middleware para parsear el body
app.use(fileUpload()); // Middleware de express-fileupload

// Configuración de morgan
app.use(morgan('dev'));

// Middleware para servir archivos estáticos
app.use(express.static(process.env.UPLOADS_DIR)); // Ruta de archivos estáticos

// Rutas de la API
app.use('/api/users', userRouter);
app.use('/api/experiences', experiencesRouter);
app.use(notFoundController);

// Middleware para manejar errores
app.use(errorController);

const port = process.env.PORT || 3000; // Obtener el puerto del entorno o utilizar el puerto 3000 por defecto

app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});

export default app;
