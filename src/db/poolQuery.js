import 'dotenv/config.js';
import mysql from 'mysql2/promise';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

const dbConfig = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB,
    connectionLimit: 10,
    timezone: 'Z'
};

let pool;

async function getPool () {
    try {
        if (!pool) {
            pool = mysql.createPool(dbConfig)
        }
        return pool;
    } catch (error) {
        console.log(error);
    }
};

// Esta funcion es para no hacer getPool en todos los controllers. En los de "movies" está de la otra manera. En "users" empiezo a usar esta forma ==>
async function sendQuery (query, values) {
    try {
        const pool = await getPool();
        const [data] = await pool.query(query, values)
        return data;
    } catch (error) {
        throw new Error (error.message)
    }
};

export {getPool, sendQuery};