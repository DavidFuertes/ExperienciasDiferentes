import pool from './getPool.js'; // Importa el pool de conexiones

async function initDb() {
    try {
        // Conexión a la base de datos para borrarla si existe
        const connection = await pool.getConnection();
        await connection.query(
            `DROP DATABASE IF EXISTS ${process.env.MYSQL_DB}`,
        );
        await connection.query(`CREATE DATABASE ${process.env.MYSQL_DB}`);
        connection.release();

        // Obtener una conexión con promesas
        const poolWithDb = pool.promise();

        // Utilizar la conexión para crear las tablas, etc.
        await poolWithDb.query(`
            USE ${process.env.MYSQL_DB};

            -- Crear la tabla Users
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                date DATE,
                avatar VARCHAR(255),
                register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                registrationCode VARCHAR(255),
                active BOOLEAN DEFAULT false,
                role ENUM('public', 'admin') NOT NULL DEFAULT 'public'
            );

            -- Crear la tabla Experiences
            CREATE TABLE IF NOT EXISTS Experiences (
                id INT AUTO_INCREMENT PRIMARY KEY,
                creator_id INT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                type ENUM('Relaxed','Medium','Adrenaline rush') NOT NULL,
                city VARCHAR(255),
                image VARCHAR(255),
                date DATE,
                price DECIMAL(10, 2),
                min_places INT,
                total_places INT,
                active BOOLEAN DEFAULT true,
                creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (creator_id) REFERENCES Users(id)
            );

            -- Crear la tabla Reservations
            CREATE TABLE IF NOT EXISTS Reservations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                experience_id INT,
                reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (experience_id) REFERENCES Experiences(id)
            );

            -- Crear la tabla Comments
            CREATE TABLE IF NOT EXISTS Comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                experience_id INT,
                content TEXT,
                rate INT CHECK(rate >= 0 AND rate <= 5),
                comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (experience_id) REFERENCES Experiences(id)
            );
        `);
        console.log('Base de datos inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
}

export default initDb;
