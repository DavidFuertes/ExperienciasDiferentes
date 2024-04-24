// Importamos la dependencia que genera cadenas aleatorias de caracteres
import randomstring from 'randomstring';

// Importamos los modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import updateRecoverPassModel from '../../models/users/updateRecoverPassModel.js';


//Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import emailUserSchema from '../../schemas/users/emailUserSchema.js';

// Importamos los errores.
import { notFoundError } from '../../services/errorService.js';

// Función controladora final para que el usuario recupere la contraseña.
const sendRecoverPassController = async (req, res, next) => {
    try {
        // Obtenemos el email de la persona que quiere recuperar su contraseña.
        const { email } = req.body;

        // Pendiente validación con Joi.
        await validateSchema(emailUserSchema, req.body);

        // Comprobamos si existe algún usuario con el email proporcionado.
        const user = await selectUserByEmailModel(email);

        // Si no existe un usuario con ese email lanzamos un error.
        if (!user) {
            notFoundError('usuario');
        }

        // Generamos el código de recuperación de contraseña.
        const recoverPassCode = randomstring.generate(10);

        // Insertamos el código de recuperación de contraseña.
        await updateRecoverPassModel(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación de contraseña enviado',
        });
    } catch (err) {
        next(err);
    }
};

export default sendRecoverPassController;