import { getPool } from '../../db/poolQuery.js';
import { experienceNotExistError } from '../../services/errorService.js';

export const selectExperienceByIdModel = async (experienceId) => {
    const pool = await getPool();

    // Comprobar si existe una experiencia con el id proporcionado.
    const [experiences] = await pool.query(
        'SELECT * FROM Experiences WHERE id = ?',
        [experienceId],
    );

    // Si no se encuentra la experiencia, lanzar un error.
    if (experiences.length === 0) {
        experienceNotExistError();
    }

    // El array de experiencias solo podrá contener una única experiencia dado que el id
    // es único. Retornamos la experiencia que se encuentra en la posición 0,
    // es decir, retornamos el objeto en lugar de retornar un array con un elemento.
    return experiences[0];
};
