// Función que devuelve una conexión con la base de datos.
import { getPool } from '../../db/poolQuery.js';

// Función que realiza una consulta a la base de datos para seleccionar un usuario con un id dado.
const selectUserByNameModel = async (name) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el id proporcionado.
    const [users] = await pool.query(`SELECT * FROM Users WHERE name = ?`, [
        name,
    ]);

    // Como solo puede haber un usuario con un mismo id, se retorna
    // el usuario con la posición 0, así retornamos el objeto en lugar
    // de retornar un array con un elemento.
    return users[0];

    // En caso de que no se haya encontrado a ningún usuario retornaremos undefined.
};

export default selectUserByNameModel;
