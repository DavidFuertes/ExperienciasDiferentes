// TODO .query, nombre de la BBDD, términos de búsqueda

import getPool from "./getPool.js"

const searchTerm = process.argv[2]; // Término de búsqueda
const DB_NAME = process.env.DB_NAME

const myPool = getPool();

await myPool.query(`USE ${DB_NAME}`); 

const [user] = await myPool.query(`SELECT user.id as id, password FROM users WHERE users LIKE "%${searchTerm}%`) // Ejemplo, esperando términos de búsqueda

console.log(user);

await myPool.end();
