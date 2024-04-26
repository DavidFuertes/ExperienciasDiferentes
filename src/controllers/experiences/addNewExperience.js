import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';

async function addNewExperience(req, res) {
    const newExperience = req.body;
    const {
        title,
        description,
        type,
        city,
        image,
        date,
        price,
        min_places,
        total_places,
    } = newExperience;
    const role = req.user;

    try {
        if (role !== 'admin') {
            throw new Error('no eres admin');
            return;
        }
        const pool = await getPool();

        const [insertInfo] = await pool.query(
            `
            INSERT INTO Experiences (title, description, type, city, image, date, price, min_places, total_places)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [
                title,
                description,
                type,
                city,
                image,
                date,
                price,
                min_places,
                total_places,
            ],
        );

        console.log(insertInfo);

        const [postedData] = await pool.query(
            `
            SELECT * FROM Experiences WHERE id = ?
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
        res.send({
            message: 'NO',
        });
        console.log(error.message);
    }
}

export { addNewExperience };
