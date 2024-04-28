import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import { userNotValid } from '../../services/errorService.js';

async function addNewComment(req, res, next) {
    const newExperience = req.body;
    const { content, rate } = newExperience;
    const { id } = req.query;
    const user_id = req.headers.user_id;

    try {
        if (!user_id) {
            userNotValid();
        }
        const pool = await getPool();

        const [insertInfo] = await pool.query(
            `
            INSERT INTO Comments (user_id, experience_id, content, rate)
            VALUES(?, ?, ?, ?)
        `,
            [user_id, id, content, rate],
        );

        console.log(insertInfo);

        const [postedData] = await pool.query(
            `
            SELECT * FROM Comments WHERE id = ?
        `,
            [insertInfo.insertId],
        );

        const resInfo = [
            {
                message: 'OK',
                newId: insertInfo.insertId,
            },
            {
                postedData,
            },
        ];

        res.status(201).json(resInfo);
    } catch (error) {
        next(error);
    }
}

export { addNewComment };
