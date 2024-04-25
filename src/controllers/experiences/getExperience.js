import 'dotenv/config.js';
import { getPool } from "../../db/poolQuery.js";

async function getExperience (req, res) {

    const experience = req.body;
    const { experience_id } = experience;
    
    try {

        const pool = await getPool();

        const [data] = await pool.query(`
        SELECT title, description, city, image, date, price, min_places, total_places FROM Experiences WHERE id = ?
    `, [experience_id]);
    
        const [rate] = await pool.query(`
        SELECT AVG(rate) AS average_rate
        FROM Comments
        WHERE experience_id = ?
        `, [experience_id]);

        const [inscribed] = await pool.query(`
            SELECT name, email, avatar FROM Users   
            INNER JOIN Reservations ON Users.id = Reservations.user_id WHERE Reservations.experience_id = ?
        `, [experience_id]);

        const fullExperience = {
        data,
        rate,
        inscribed
        };
        const fullExperienceJson = JSON.stringify(fullExperience);

        console.log(fullExperienceJson);

        res.json(fullExperienceJson);

    } catch (error) {
        res.send({
            message: 'NO'
        })
        console.log(error.message)
    }

}

export { getExperience };