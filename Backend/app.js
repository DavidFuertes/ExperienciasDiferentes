import express from 'express';
import fileUpload from 'express-fileupload';

// Importamos dotenv para cargar variables de entorno desde un archivo .env
import 'dotenv/config.js';

// Importamos morgan para mostrar información de las peticiones
import morgan from 'morgan';

// Importamos cors para evitar problemas con las CORS
import cors from 'cors';

// Importamos las rutas
import { experiencesRouter } from './src/routes/experiencesRouter.js';
import { userRouter } from './src/routes/userRouter.js';

// Importamos el controlador de errores
import { errorController } from './src/controllers/errors/index.js';

const app = express(); // crea servidor

app.use(cors()); // Middleware de cors
app.use(express.json()); // Middleware para parsear el body
app.use(fileUpload({ useTempFiles: true })); // Middleware de express-fileupload

// Configuración de morgan
app.use(morgan('dev'));

// Ruta estática para servir archivos desde la carpeta de subidas (uploads)
app.use(express.static('uploads'));

// Rutas de la API
app.use('/api/users', userRouter);
app.use('/api/experiences', experiencesRouter);

// Middleware para manejar errores
app.use(errorController);

const port = process.env.PORT || 3000; // Obtener el puerto del entorno o utilizar el puerto 3000 por defecto

app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});

export default app;
