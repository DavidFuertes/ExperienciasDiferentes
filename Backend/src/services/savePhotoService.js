import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

dotenv.config();

// Obtener el valor de UPLOADS_DIR de las variables de entorno
const UPLOADS_DIR = process.env.UPLOADS_DIR;

// Función para guardar la foto en la carpeta de subida de archivos
export const savePhotoService = async (img, width) => {
    console.log(img);
    try {
        // Ruta absoluta al directorio de subida de archivos.
        const uploadsDir = path.join(process.cwd(), UPLOADS_DIR);

        // Creamos la carpeta uploads si no existe
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir);
        }

        // Convertir los datos de la imagen a Buffer si no están en ese formato
        // const imageData = Buffer.isBuffer(img.data)
        //     ? img.data
        //     : Buffer.from(img.data, 'base64');
        // const buffer = imageData.toString();
        // console.log('buffer', buffer);
        // Creamos un objeto de tipo Sharp con la imagen recibida.
        const sharpImg = sharp(img.data);

        // Redimensionar la imagen

        sharpImg.resize(width);

        // Nombre de archivo único basado en la fecha actual y el nombre original de la imagen
        // const imgName = `${Date.now()}_${img.name}`;
        const imgName = `${crypto.randomUUID()}.jpg`;
        console.log(imgName);

        // Ruta de destino donde se guardará la imagen
        const imgPath = path.join(uploadsDir, imgName);
        console.log('imgPath', imgPath);

        // Copiar la imagen al directorio de subida de archivos
        try {
            await sharpImg.toFile(imgPath);
        } catch (err) {
            console.error(err);
            throw err; // Lanzar el error para que se maneje en la capa superior
        }

        // Devolver el nombre de archivo único para su posterior almacenamiento en la base de datos
        return imgName;
    } catch (err) {
        console.error(err);
        throw err; // Lanzar el error para que se maneje en la capa superior
    }
};
