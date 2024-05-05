// Importa los modelos necesarios.
import selectUserByRecoverCodeModel from '../../models/users/selectUserByRecoverCodeModel.js';
import updatePasswordModel from '../../models/users/updatePasswordModel.js';

// Importa la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importa el esquema de Joi.
import resetPasswordSchema from '../../schemas/users/resetPasswordSchema.js';

// Importa los errores.
import {
    invalidRecoveryCodeError,
    userNotExistError,
} from '../../services/errorService.js';

// Controlador para restablecer la contraseña utilizando el código de recuperación.
const resetPasswordController = async (req, res, next) => {
    try {
        // Validar los datos de entrada con Joi.
        await validateSchema(resetPasswordSchema, req.body);

        // Obtener los datos del cuerpo de la solicitud.
        const { recoverPassCode, newPassword } = req.body;

        // Comprobar si existe un usuario con el código de recuperación.
        const user = await selectUserByRecoverCodeModel(recoverPassCode);

        // Si no existe un usuario con ese código de recuperación, lanzar un error.
        if (!user) {
            invalidRecoveryCodeError();
        }

        // Actualizar la contraseña del usuario en la base de datos.
        await updatePasswordModel(user.id, newPassword);

        // Devolver una respuesta de éxito.
        res.send({
            status: 'ok',
            message: 'Contraseña restablecida con éxito',
        });
    } catch (err) {
        next(err);
    }
};

export default resetPasswordController;
