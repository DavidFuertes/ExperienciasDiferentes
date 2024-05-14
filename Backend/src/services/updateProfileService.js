import { updateUserProfileModel } from '../models/users/updateUserProfileModel.js';

export const updateProfileService = async (userId, body, avatar) => {
    try {
        // Llamamos a la función del modelo para actualizar el perfil del usuario
        const user = await updateUserProfileModel(
            userId,
            body.name,
            body.email,
            body.date,
            avatar, // Pasamos el nombre de la foto como avatar
            body.residence,
            body.languages,
            body.newPassword,
        );

        // Devolvemos el usuario actualizado
        return user;
    } catch (error) {
        throw new Error('Error al actualizar el perfil del usuario');
    }
};
