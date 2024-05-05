import db from '../database'; // Suponiendo que tienes un módulo para la interacción con la base de datos

const selectUserByRecoverCodeModel = async (recoverPassCode) => {
    try {
        const query = 'SELECT * FROM users WHERE recover_code = ?';
        const [rows] = await db.query(query, [recoverPassCode]);
        return rows[0]; // Devolvemos el primer usuario encontrado, si existe
    } catch (error) {
        console.error(
            'Error al buscar usuario por código de recuperación:',
            error,
        );
        throw error; // Reenviamos el error para manejarlo en la capa superior
    }
};

export default selectUserByRecoverCodeModel;
