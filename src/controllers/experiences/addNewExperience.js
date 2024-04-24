import 'dotenv/config.js';
import { getPool } from "../../db/poolQuery.js";

async function addNewExperience (req, res) {

    const newExperience = req.body;
    const { title, description, type, city, image, date, price, min_places, total_places } = newExperience;
    
    try {

        const pool = await getPool();

        const [insertInfo] = await pool.query(`
            INSERT INTO Experiences (title, description, type, city, image, date, price, min_places, total_places)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [title, description, type, city, image, date, price, min_places, total_places]);

        console.log(insertInfo)

        res.status(201).send({
            message: 'OK',
            newId: insertInfo.insertId
        })

    } catch (error) {
        res.send({
            message: 'NO'
        })
        console.log(error.message)
    }

}

export { addNewExperience };