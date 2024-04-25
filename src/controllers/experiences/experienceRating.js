import 'dotenv/config.js';
import { getPool } from "../../db/poolQuery.js";

async function experienceRating (req, res) {

    const rateExperience = req.body;
    const { user_id, experience_id, rating} = rateExperience;
    
    try {

        const pool = await getPool();

        const [insertInfo] = await pool.query(`
            INSERT INTO Ratings (user_id, experience_id, rating)
            VALUES(?, ?, ?)
        `, [user_id, experience_id, rating]);

        console.log("hola" + insertInfo)

        res.status(201).send({
            message: 'Experiencia valorada con éxito.',
            newId: insertInfo.insertId
        })

    } catch (error) {
        res.send({
            message: 'Error al enviar la valoración'
        })
        console.log(error.message)
    }

}

export { experienceRating };