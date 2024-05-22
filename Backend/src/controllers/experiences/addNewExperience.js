import 'dotenv/config.js';
import { getPool } from '../../db/poolQuery.js';
import { addNewExperienceSchema } from '../../schemas/experiences/addNewExperienceSchema.js';
import validateSchema from '../../utilities/validateSchema.js';
import {
    duplicateImgCloudinary,
    savePhotoExpToCloudinary,
} from '../../utilities/cloudinaryImages.js';
import 'dotenv/config.js';
import { imageNeeded } from '../../services/errorService.js';

const { DEFAULT_RELAJADO_URL, DEFAULT_MEDIO_URL, DEFAULT_ADRENALINA_URL } =
    process.env;

async function addNewExperience(req, res, next) {
    const user_id = req.user.id;

    const newExperience = req.body;
    const {
        id, //Este es el id de la experiencia que vamos a duplicar
        title,
        description,
        type,
        city,
        // image,
        date,
        price,
        min_places,
        total_places,
    } = newExperience;

    try {
        //Validamos el body con joi
        const pool = await getPool();

        await validateSchema(addNewExperienceSchema, req.body);

        if (req.files?.newImage) {
            const secure_url = await savePhotoExpToCloudinary(
                req.files.newImage.tempFilePath,
            );

            const [insertInfo] = await pool.query(
                `
                INSERT INTO Experiences (creator_id, title, description, type, city, image, date, price, min_places, total_places)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
                [
                    user_id,
                    title,
                    description,
                    type,
                    city,
                    secure_url,
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
                    message: 'Experiencia duplicada correctamente',
                    newId: insertInfo.insertId,
                },
                {
                    postedData,
                },
            ];

            res.status(201).json(resInfo);
        } else {
            //Si no hay nueva imagen obtenemos la imagen anterior
            const [image] = await pool.query(
                `SELECT image FROM Experiences WHERE id = ?;`,
                [id],
            );

            const oldImage = image[0].image;

            if (!oldImage) {
                imageNeeded();
            }

            //Creamos una variable que almacene la url de la imagen antigua
            let imageToSave = oldImage;

            //Si la imagen anterior no es la por defecto, la duplicamos creando una nueva url pero que apunta a la misma imagen!!!
            if (
                image &&
                oldImage !==
                    (DEFAULT_RELAJADO_URL ||
                        DEFAULT_MEDIO_URL ||
                        DEFAULT_ADRENALINA_URL)
            ) {
                imageToSave = await duplicateImgCloudinary(oldImage);
            }

            const [insertInfo] = await pool.query(
                `
                    INSERT INTO Experiences (creator_id, title, description, type, city, image, date, price, min_places, total_places)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    user_id,
                    title,
                    description,
                    type,
                    city,
                    imageToSave,
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
                    message: 'Experiencia duplicada correctamente',
                    newId: insertInfo.insertId,
                },
                {
                    postedData,
                },
            ];

            res.status(201).json(resInfo);
        }
    } catch (error) {
        next(error);
    }
}

export { addNewExperience };
