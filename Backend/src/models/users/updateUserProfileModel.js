import { getPool } from '../../db/poolQuery.js';
import { failedUserUpdate } from '../../services/errorService.js';

export const updateUserProfileModel = async (
    userId,
    name,
    email,
    date,
    avatar,
) => {
    const pool = await getPool();

    let query = 'UPDATE Users SET name = ?, email = ?';

    let values = [name, email];

    if (date) {
        query += ', date = ?';
        values.push(date);
        query += ', date = NULL';
    }

    if (avatar) {
        query += ', avatar = ?';
        values.push(avatar);
        query += ', avatar = NULL';
    }

    query += ' WHERE id = ?';

    const [update] = await pool.query(query, [...values, userId]);

    if (update.affectRows === 0) {
        failedUserUpdate();
    }

    return update;

    // TODO : MOVER A MODELS.
};
