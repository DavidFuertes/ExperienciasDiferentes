import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import { addNewExperienceSchema } from '../../schemas/experiences/addNewExperienceSchema.js';
import validateSchema from '../../utilities/validateSchema.js';
import { notAuthUser } from '../../services/errorService.js';

async function addNewExperience(req, res, next) {
    const { id } = req.user;
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
            INSERT INTO Experiences (title, creator_id, description, type, city, image, price, min_places, total_places)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
            [
                title,
                id,
                description,
                type,
                city,
                image,
                price,
                min_places,
                total_places,
            ],
        );

        console.log(insertInfo);

        const [insertDate] = await pool.query(
            `
            INSERT INTO Dates (experience_id, date)
            VALUES(?, ?)
        `,
            [
                insertInfo.insertId,
                date,
            ],
        );

        console.log(insertDate)

        const [postedData] = await pool.query(
            `
            SELECT Experiences.*, Dates.date 
            FROM Experiences 
            LEFT JOIN Dates ON Experiences.id = Dates.experience_id
            WHERE Experiences.id = ?
            `,
            [insertInfo.insertId] // Aquí pasas la ID como parámetro
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
