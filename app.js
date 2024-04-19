//Importamos las dependencias necesarias
import express from 'express';

// Obtenemos las variables de entorno.
import { PORT } from './env.js';

// Importamos el enrutador para las rutas
import routes from './src/routes/index.js';


//Creación del servidor con express
const app = express();



// Middleware para indicar a express dónde están las rutas.
app.use(routes);

// Le indicamos al servidor que escuche peticiones en el puerto establecido en
// las variables de entorno.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
