// Importamos los modelos.
import validateSchema from '../../utilities/validateSchema.js';
import { changeUserPasswordSchema } from '../../schemas/users/changeUserPasswordSchema.js';

import { changeUserPasswordModel } from '../../models/users/changeUserPasswordModel.js';

// Función controladora final que crea un nuevo usuario.
export const changeUserPasswordController = async (req, res, next) => {
    const { id } = req.user;
    console.log(req.body);
    try {
        //Todo: Cambiar el mensaje de credenciales incorrectas.
        // Validamos los datos con Joi.
        await validateSchema(changeUserPasswordSchema, req.body);

        // Obtener los parametros / datos del  body
        const { currentPassword, newPassword } = req.body;

        await changeUserPasswordModel(id, currentPassword, newPassword);

        res.status(201).send({
            status: 'ok',
            message: 'Contraseña actualizada con éxito',
        });
    } catch (err) {
        next(err);
    }
};
