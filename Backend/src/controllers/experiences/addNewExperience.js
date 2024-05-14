import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import { addNewExperienceSchema } from '../../schemas/experiences/addNewExperienceSchema.js';
import validateSchema from '../../utilities/validateSchema.js';
import { notAuthUser } from '../../services/errorService.js';

async function addNewExperience(req, res, next) {
    const { id } = req.user;
    console.log('id', id);
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

    try {
        //Validamos el body con joi
        await validateSchema(addNewExperienceSchema, req.body);

        const pool = await getPool();

        const [insertInfo] = await pool.query(
            `
            INSERT INTO Experiences (title, creator_id, description, type, city, image, date, price, min_places, total_places)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [
                title,
                id,
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
        next(error);
    }
}

export { addNewExperience };
