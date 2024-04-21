//Importamos las dependencias necesarias
import express from 'express';
import 'dotenv/config.js';
// Obtenemos las variables de entorno.
const PORT = process.env.PORT || 3000;

//Creación del servidor con express
const app = express();

//Arrancamos la BBDD
import initDb from './src/db/getPool.js';

// Le indicamos al servidor que escuche peticiones en el puerto establecido en
// las variables de entorno.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
