import { getPool } from "../../db/poolQuery.js";

async function changeExperienceStatus (req, res) {

    const { experienceId, is_active } = req.body;

    try {
        const pool = await getPool();
        await pool.query(`
            UPDATE Experiences
            SET active = ?
            WHERE id = ?;
        `, [is_active, experienceId]);

        res.status(200).send({ message: 'OK' })
    } catch (error) {
        console.log(error.message)
    }
}

export { changeExperienceStatus };