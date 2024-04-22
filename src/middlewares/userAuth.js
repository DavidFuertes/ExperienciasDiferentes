import jwt from 'jsonwebtoken';
import SECRET from '../../env.js';
import { errorController } from '../controllers/errors/errorController.js';

export const userAuth = (req, res, next) => {
    // Aquí va la lógica de verificación de autenticación

    // Buscamos el token
    let { token } = req.cookies;

    // Si no hay token, lo buscamos en el header
    if (!token) {
        const { authorization } = req.headers;

        // Si tampoco hay token en el header, mandamos un error
        if (!authorization) {
            throw new errorController(
                401,
                'Necesitas estar logueado y mandar el token.',
            );
        }

        // Si hay token en el header, lo guardamos en token, el split es para saltar el prefijo 'Bearer '
        token = authorization.split(' ')[1];
    }

    // Verificamos el token
    const userInfo = jwt.verify(token, SECRET);

    // Guardamos la información del usuario en req.user
    req.user = userInfo;
    next();
};
