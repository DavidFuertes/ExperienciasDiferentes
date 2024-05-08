import { getPool } from '../../db/poolQuery';
import { failedAvatarError } from '../../services/errorService';

export const updateUserAvatarModel = async (usersId, avatarName) => {
    const pool = await getPool();

    const [result] = await pool.query(
        'UPDATE users SET avatar = ? WHERE id = ?'[(avatarName, usersId)],
    );

    if (result.affectedRows === 0) {
        failedAvatarError();
        throw Error;
    }

    return result;
};
