import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const {
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    UPLOADS_DIR,
} = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const saveAvatarToCloudinary = async (img) => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(img, {
            transformation: [{ width: 300, height: 300, crop: 'fill' }],
        });

        return secure_url;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const savePhotoExpToCloudinary = async (img) => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(img, {
            transformation: [{ width: 1000, crop: 'fill' }],
        });

        return secure_url;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteImageFromCloudinary = async (img) => {
    const public_id = path.parse(img).name;
    console.log('public_id', public_id);
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        throw new Error(error.message);
    }
};

//!ESTA FUNCIÓN NO DUPLICA LA IMAGEN, LO QUE HACE ES CREAR UNA NUEVA URL QUE APUNTA A LA MISMA IMAGEN ASÍ PODEMOS EVITAR DUPLICADOS
//!ESTA URL SEGUIRÁ FUNCIONANDO AUNQUE SE BORRE LA IMAGEN PREVIA DE CLOUDINARY PERO ES UN ENLACE TEMPORAL QUE DURA TAN SOLO 30 DIAS
export const duplicateImgCloudinary = async (url) => {
    try {
        const durationInMilliseconds = 30 * 24 * 60 * 60 * 1000;
        const timestamp =
            Math.floor(Date.now() / 1000) + durationInMilliseconds / 1000;
        const fileName = path.basename(url);
        const publicId = path.parse(fileName).name;

        const newUrl = cloudinary
            .url(publicId, {
                type: 'upload',
                timestamp,
                sign_url: true,
                secure: true,
            })
            .toString();

        return newUrl;
    } catch (error) {
        console.error(error);
        throw new Error('Error al duplicar la imagen');
    }
};

export const generateNewImgCloudinary = async (url) => {
    try {
        const newFilename = uuidv4();
        const response = await cloudinary.uploader.upload(url, {
            public_id: newFilename,
            transformation: [
                {
                    width: 400,
                    height: 400,
                    crop: 'fill',
                },
            ],
            use_filename: true,
        });

        return response.secure_url;
    } catch (error) {
        console.error(error);
        throw new Error('Error al generar la imagen');
    }
};
