import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config.js';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

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

export const resizeImage = async (img, width) => {
    return sharp(img.data).resize({ width });
};

export const saveImageToFolder = async (img) => {
    try {
        const uploadsDir = path.join(process.cwd(), UPLOADS_DIR);
        const newImageName = crypto.randomUUID();
        const newImagePath = path.join(uploadsDir, `${newImageName}.jpg`);
        await img.toFile(newImagePath);

        return newImageName + '.jpg';
    } catch (error) {
        throw new Error(error.message);
    }
};

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
            transformation: [{ width: 1000, height: 1000, crop: 'fill' }],
        });

        return secure_url;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteImageFromFolder = async (img) => {
    const uploadsDir = path.join(process.cwd(), UPLOADS_DIR);
    const imgPath = path.join(uploadsDir, img);
    try {
        await fs.access(imgPath);
        await fs.unlink(imgPath);
    } catch {
        console.log(
            'No se ha podido borrar la foto del servidor por algún motivo.',
        );
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
