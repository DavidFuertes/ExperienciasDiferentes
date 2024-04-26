import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import { errorController } from '../controllers/errors/errorController.js';
import { getPool } from '../db/poolQuery.js';
import { userNotValid } from '../services/errorService.js';

async function userAuth(req, res, next) {
    // Aquí va la lógica de verificación de autenticación

    // Buscamos el token
    const auth = req.headers.token;
    //const { user_id } = data;
    const secret = process.env.SECRET;

    try {
        if (!auth) {
            userNotValid();
        }
        const userInfo = jwt.verify(auth, secret);
        const { role } = userInfo;

        req.user = role;
        next();
    } catch (error) {
        errorController(error, req, res);
    }
}

export { userAuth };
