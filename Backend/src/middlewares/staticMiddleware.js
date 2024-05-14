import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const app = express(); // Crear una instancia de la aplicación Express

const UPLOADS_DIR = process.env.UPLOADS_DIR; // Obtener el valor de UPLOADS_DIR de las variables de entorno

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
export const staticMiddleware = () => {
    if (UPLOADS_DIR) {
        app.use(express.static(UPLOADS_DIR));
    } else {
        console.error('UPLOADS_DIR no está definido en el archivo .env');
    }
};

// Función para guardar la foto en la carpeta de subida de archivos
export const savePhotoService = async (img, width) => {
    try {
        if (!UPLOADS_DIR) {
            throw new Error('UPLOADS_DIR no está definido');
        }

        // Ruta absoluta al directorio de subida de archivos.
        const uploadsDir = path.join(process.cwd(), UPLOADS_DIR);

        // Creamos la carpeta uploads si no existe
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir);
        }

        // Nombre de archivo único basado en la fecha actual y el nombre original de la imagen
        const uniqueFileName = `${Date.now()}_${img.name}`;

        // Ruta de destino donde se guardará la imagen
        const destPath = path.join(uploadsDir, uniqueFileName);

        // Copiar la imagen al directorio de subida de archivos
        await img.mv(destPath);

        // Devolver el nombre de archivo único para su posterior almacenamiento en la base de datos
        return uniqueFileName;
    } catch (err) {
        console.error(err);
        throw err; // Lanzar el error para que se maneje en la capa superior
    }
};
