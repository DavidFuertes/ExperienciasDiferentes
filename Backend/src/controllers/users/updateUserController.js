// Importamos el servicio de actualización de perfil
import { updateProfileService } from '../../services/updateProfileService.js';

// Controlador para actualizar el usuario
export const updateUserController = async (req, res, next) => {
    const userId = req.user.id; // Obtenemos el ID del usuario de la solicitud
    console.log(req.files.avatar, 'Vamosoooo');
    try {
        // Si hay un archivo de avatar en la solicitud, guardamos la foto primero
        let photoName = null;

        if (req.files && req.files.photo) {
            photoName = await savePhotoService(req.files.avatar, 500);
        }

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
