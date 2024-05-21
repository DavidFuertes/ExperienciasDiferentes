// Importamos el servicio de actualización de perfil
import { updateProfileService } from '../../services/updateProfileService.js';
import validateSchema from '../../utilities/validateSchema.js';
import { updateUserSchema } from '../../schemas/users/updateUserSchema.js';

// Importamos el servicio para guardar la foto
import {
    deleteImageFromCloudinary,
    saveAvatarToCloudinary,
} from '../../utilities/cloudinaryImages.js';
import { getPool } from '../../db/poolQuery.js';

// Controlador para actualizar el usuario
export const updateUserController = async (req, res, next) => {
    // Obtenemos el ID del usuario de la solicitud
    const userId = req.user.id;

    try {
        await validateSchema(updateUserSchema, req.body);

        const pool = await getPool();

        // Si hay un archivo de avatar en la solicitud procesamos la imagen
        if (req.files?.avatar) {
            // Primero eliminamos la imagen anterior si la hay
            const [avatar] = await pool.query(
                `SELECT avatar FROM users WHERE id = ?;`,
                [userId],
            );

            if (avatar) {
                await deleteImageFromCloudinary(avatar);
                console.log('foto borrada de cloudinary');
            }

            // Luego guardamos la nueva
            const secure_url = await saveAvatarToCloudinary(
                req.files.avatar.tempFilePath,
            );

            const updatedUser = await updateProfileService(
                userId,
                req.body,
                secure_url,
            );

            res.send({
                status: 'ok',
                message: 'Perfil actualizado correctamente',
                data: { updatedUser },
            });
        } else {
            const updatedUser = await updateProfileService(userId, req.body);

            res.send({
                status: 'ok',
                message: 'Perfil actualizado correctamente',
                data: { updatedUser },
            });
        }

        // Llamamos al servicio de actualización de perfil, pasando el ID del usuario, el cuerpo de la solicitud y el nombre de la foto (si existe)
    } catch (error) {
        console.error('Error en el controlador updateUserController:', error); // Agregar console.log para imprimir el error
        next(error); // En caso de error, pasamos el control al siguiente middleware de manejo de errores
    }
};
