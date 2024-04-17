// Método config de dotenv para acceder a las variables de entorno
// personalizadas.
import 'dotenv/config';

// Obtenemos las variables de entorno accediendo al archivo .env
// mediante process.
const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    PORT,
    SECRET,
    UPLOADS_DIR,
} = process.env;

// Exportamos las variables de entorno.
export {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    PORT,
    SECRET,
    UPLOADS_DIR,
};
