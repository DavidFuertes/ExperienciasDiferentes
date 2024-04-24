// Importamos las dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import {
  userNotExistError,
  userNotValidPasswordError,
} from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const changeUserPasswordModel = async (
  username,
  currentPassword,
  newPassword
) => {
  const pool = await getPool();

  // Buscamos en la base de datos algún usuario con ese nombre y sacamos su password.
  const [users] = await pool.query(
    `SELECT id,password FROM users WHERE username = ?`,
    [username]
  );

  // Si no existe algún usuario con ese nombre lanzamos un error.
  if (users.length == 0) {
    userNotExistError();
  }

  //Comparar la currentPassword con la password de la base de datos

  const passwordHash = users[0].password;
  const validPassword = await bcrypt.compare(currentPassword, passwordHash);

  // Si la contraseña no es válida lanzamos un error.

  if (!validPassword) {
    userNotValidPasswordError();
  }

  // Encriptamos la nueva contraseña y la actualizamos en la base de datos.

  const newPassHash = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `UPDATE users SET password = "${newPassHash}" WHERE username = ?`,
    [username]
  );
};
