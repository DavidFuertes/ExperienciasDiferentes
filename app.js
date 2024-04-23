//Importamos las dependencias necesarias
import express from 'express';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';

// Obtenemos las variables de entorno.
import { PORT } from './env.js';


// Importamos las funciones controladoras.
import { notFoundController } from './src/controllers/errors/notFoundController.js';
import { errorController } from './src/controllers/errors/errorController.js';

// Importamos el enrutador para las rutas
import routes from './src/routes/index.js';



//Creación del servidor con express
const app = express();


// Middleware de análisis de cuerpo
app.use(expres.json());
app.use(express.urlencoded({ extended: true }));

//Middleware upload de archivos
app.use(fileUpload());

// Middleware CORS
app.use(cors());

// Middleware de archivos estáticos
app.use('/imagenes', express.static(path.join(__dirname, 'public/images')));

// Middleware de Ruta No Encontrada que ejecuta su función controladora
app.use(notFoundController);

// Middleware de errores
app.use(errorController);



// Middleware para indicar a express dónde están las rutas.
app.use(routes);


// Le indicamos al servidor que escuche peticiones en el puerto establecido en
// las variables de entorno.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});