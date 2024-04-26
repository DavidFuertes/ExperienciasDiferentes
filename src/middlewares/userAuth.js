import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import { errorController } from '../controllers/errors/errorController.js';
import { getPool } from '../db/poolQuery.js';

async function userAuth(req, res, next) {
    // Aquí va la lógica de verificación de autenticación

    // Buscamos el token
    const auth = req.headers.token;
    //const { user_id } = data;
    const secret = process.env.SECRET;

    try {
        if (!auth) {
            throw new Error('no hay token');
            return;
        }
        const userInfo = jwt.verify(auth, secret);
        const { role } = userInfo;

        req.user = role;
        next();
    } catch (error) {
        res.send({
            message: 'No puedes votar sin estar registrado.',
        });
        console.log(error.message);
    }
}

export { userAuth };
