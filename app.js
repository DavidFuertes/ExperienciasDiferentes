//Importamos las dependencias necesarias
import express from 'express';

// Obtenemos las variables de entorno.
import { PORT } from './env.js';

//Creación del servidor con express
const app = express();

// Le indicamos al servidor que escuche peticiones en el puerto establecido en
// las variables de entorno.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
