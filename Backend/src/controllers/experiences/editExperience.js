import { getPool } from '../../db/poolQuery.js';
import { changeExperienceStatusSchema } from '../../schemas/experiences/changeExperienceStatusSchema.js';
import { editExperienceSchema } from '../../schemas/experiences/editExperienceSchema.js';
import { notAuthUser } from '../../services/errorService.js';
import validateSchema from '../../utilities/validateSchema.js';
import {
    deleteImageFromCloudinary,
    savePhotoExpToCloudinary,
} from '../../utilities/cloudinaryImages.js';
import 'dotenv/config.js';

const { DEFAULT_RELAJADO_URL,
        DEFAULT_MEDIO_URL,
        DEFAULT_ADRENALINA_URL} = process.env;

async function editExperience(req, res, next) {
    const { id } = req.query;

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
        is_active,
    } = newExperience;

    console.log(req.files.file)

    try {
        //await validateSchema(editExperienceSchema, req.body);

        const pool = await getPool();

        if (req.files?.file) {
            // Primero eliminamos la imagen anterior si la hay
            const [image] = await pool.query(
                `SELECT image FROM Experiences WHERE id = ?;`,
                [id],
            );

            const oldImage = image[0].image;

            if (image && oldImage !== (DEFAULT_RELAJADO_URL || DEFAULT_MEDIO_URL || DEFAULT_ADRENALINA_URL)) {
                await deleteImageFromCloudinary(oldImage);
            }

            // Luego guardamos la nueva
            const secure_url = await savePhotoExpToCloudinary(
                req.files.file.tempFilePath
            );
        
            await pool.query(
                `
                UPDATE Experiences
                SET 
                title = ?,
                description = ?,
                type = ?,
                city = ?,
                image = ?,
                date = ?,
                price = ?,
                min_places = ?,
                total_places = ?,
                active = ?
                WHERE
                id = ?;
            `,
                [
                    title,
                    description,
                    type,
                    city,
                    secure_url,
                    date,
                    price,
                    min_places,
                    total_places,
                    is_active,
                    id,
                ],
            );
    
            res.status(200).send({ message: 'OK' });
        } else {
            await pool.query(
                `
                UPDATE Experiences
                SET 
                title = ?,
                description = ?,
                type = ?,
                city = ?,
                image = ?,
                date = ?,
                price = ?,
                min_places = ?,
                total_places = ?,
                active = ?
                WHERE
                id = ?;
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
                    is_active,
                    id,
                ],
            );
    
            res.status(200).send({ message: 'OK' });
            
        }


        


    } catch (error) {
        next(error);
    }
}

export { editExperience };
