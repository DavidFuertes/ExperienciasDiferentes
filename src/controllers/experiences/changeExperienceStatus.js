import { getPool } from "../../db/poolQuery.js";

async function changeExperienceStatus (req, res) {

    const { is_active } = req.body;
    const { id } = req.query;

    try {
        const pool = await getPool();
        await pool.query(`
            UPDATE Experiences
            SET active = ?
            WHERE id = ?;
        `, [is_active, id]);

        res.status(200).send({ message: 'OK' })
    } catch (error) {
        console.log(error.message)
    }
}

export { changeExperienceStatus };