import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import { invalidToken } from '../services/errorService.js';

function userAuth(req, res, next) {
    // Aquí va la lógica de verificación de autenticación

    // Buscamos el token
    const auth = req.headers.token;
    const secret = process.env.SECRET;
    try {
        if (!auth) {
            invalidToken();
        }
        const userInfo = jwt.verify(auth, secret);
        const { role } = userInfo;

        req.user = role;
        next();
    } catch (error) {
        next(error);
    }
}

export { userAuth };
