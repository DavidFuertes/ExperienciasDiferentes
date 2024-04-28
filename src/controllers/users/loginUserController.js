//Importamos las dependencias
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Importamos las funciones modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

//Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import loginUserSchema from '../../schemas/users/loginUserSchema.js';

// Importamos los errores.
// Faltan crear estos errores personalizados
// en ../../services/errorService.js

// Importamos la variable de entorno SECRET necesaria para
// crear el token
import 'dotenv/config.js';
import {
    invalidCredentialsError,
    userNotActive,
} from '../../services/errorService.js';

const SECRET = process.env.SECRET;

//Función controladora final que logea a un usuario retornando un token
const loginUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(loginUserSchema, req.body);

        const { email, password } = req.body;

        //Seleccionamos los datos el usuario.
        const user = await selectUserByEmailModel(email);

        // Esta variable almacena un valor booleano indicando si la contraseña es correcto o no.
        let validPass;
        console.log(user);

        if (user) {
            // Comprobamos si la contraseña que nos llega del cliente coincide con la del usuario seleccionado.
            validPass = await bcrypt.compare(password, user.password);
        }

        if (!user || !validPass) {
            invalidCredentialsError();
        }

        //Deberíamos lanzar un error si el usuario está pendiente de
        //aprobación porque aún no haya activado la cuenta, es decir,
        //que esté inactivo
        if (user.active === 0) {
            userNotActive();
        }

        // Creamos un objeto con la info que queremos meter en el token.
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        // Creamos el token y expirará en 1 hora
        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '30d',
        });

        res.status(201).send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default loginUserController;
