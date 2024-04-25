//import jwt from 'jsonwebtoken';
import { errorController } from '../controllers/errors/errorController.js';
import { getPool } from "../db/poolQuery.js";

async function userAuth (req, res, next)  {
    // Aquí va la lógica de verificación de autenticación

    // Buscamos el token
    const data = req.body;
    const { user_id } = data;
    
    

    try {
        const pool = await getPool();
        const [userAuth] = await pool.query(`
        SELECT EXISTS(SELECT 1 FROM Users WHERE Users.id = ?) AS existe_id;
        `, [user_id])

        const userExists = userAuth[0];
        const { existe_id } = userExists;
        if (existe_id) {
            console.log(userExists);
            next();
        } else {
            throw new Error(error.message);
        }
        

    } catch (error) {
        res.send({
            message: 'NO'
        })
        console.log(error.message)
        
    }

};

export { userAuth };
