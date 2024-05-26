import { getPool } from '../../db/poolQuery.js';

export const deleteUserAccount = async (req, res) => {
    try {
        const pool = await getPool();

        const userId = req.user.id;

        //Actualizamos active a 0 para hacer un borrado lógico del usuario, sin perder la integridad de la base de datos
        await pool.query(`UPDATE Users SET active = 0 WHERE id = ?`, [userId]);
        res.status(200).json({
            status: 'ok',
            message: 'Cuenta eliminada correctamente',
        });
    } catch (err) {
        console.error('Error al eliminar la cuenta: ', error);
        res.status(500).json({
            message: 'Error al eliminar la cuenta',
        });
    }
};
