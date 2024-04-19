import "dotenv/config.js";
import { createPool } from "mysql2/promise.js";

let myPool;

export function getPool(){

    const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS} = process.env

    if (!myPool) {
        myPool= createPool({
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            pass: MYSQL_PASS,
        })
    }
    
    return myPool;

}

