// Importamos el servicio de actualización de perfil
import { updateProfileService } from '../../services/updateProfileService.js';

// Importamos el servicio para guardar la foto
import { savePhotoService } from '../../services/savePhotoService.js';

// Controlador para actualizar el usuario
export const updateUserController = async (req, res, next) => {
    // Obtenemos el ID del usuario de la solicitud
    const userId = req.user.id;
    console.log('req.files', req.files);
    const img = req.files.avatar;
    try {
        // Si hay un archivo de avatar en la solicitud, guardamos la foto primero

        const photoName = await savePhotoService(img, 200);

        // Llamamos al servicio de actualización de perfil, pasando el ID del usuario, el cuerpo de la solicitud y el nombre de la foto (si existe)
        const user = await updateProfileService(userId, req.body, photoName);

        // Enviamos una respuesta con el usuario actualizado
        res.send({
            status: 'ok',
            message: 'Perfil actualizado correctamente',
            data: { user },
        });
    } catch (error) {
        console.error('Error en el controlador updateUserController:', error); // Agregar console.log para imprimir el error
        next(error); // En caso de error, pasamos el control al siguiente middleware de manejo de errores
    }
};
