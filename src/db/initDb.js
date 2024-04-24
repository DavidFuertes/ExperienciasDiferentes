import pool from './getPool.js';
import dotenv from 'dotenv';

dotenv.config();

async function insertSampleData(connection) {
    try {
        // Metemos datos en la tabla Users
        await connection.query(`
            INSERT INTO Users (name, email, password, date, avatar)
            VALUES
                ('Juan Pérez', 'juanperez@example.com', 'contraseña123', '1990-01-01', 'avatar1.jpg'  ),
                ('María García', 'mariagarcia@example.com', 'contraseña456', '1995-03-15', 'avatar2.jpg' )
        `);

        //  Metemos datos en la tabla Experiences
        await connection.query(`
            INSERT INTO Experiences (creator_id, title, description, type, city, image, date, price, min_places, total_places, active)
            VALUES
                (1, 'Aventura en las Montañas', 'Experimenta la emoción de hacer senderismo en las montañas.', 'Adrenalina pura', 'Mountainville', 'montaña.jpg', '2024-05-01', 50.00, 5, 10, true),
                (2, 'Tour por la Ciudad', 'Explora la ciudad y sus puntos de referencia.', 'Relajado', 'Cityville', 'ciudad.jpg', '2024-06-15', 30.00, 3, 8, true)
        `);

        // Insert sample data into the Reservations table
        await connection.query(`
            INSERT INTO Reservations (user_id, experience_id)
            VALUES
                (1, 1),
                (2, 2)
        `);

        // Insert sample data into the Comments table
        await connection.query(`
            INSERT INTO Comments (user_id, experience_id, content, rate)
            VALUES
                (1, 1, '¡Experiencia increíble!', 5),
                (2, 2, '¡Buen tour, me encantó!', 4)
        `);

        console.log('Datos de ejemplo insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar datos de ejemplo:', error.message);
    }
}

async function createDatabaseAndTables() {
    let connection;
    try {
        // Obtenemos una conexión del pool
        connection = await pool.getConnection();

        // Verificamos si la base de datos ya existe
        const [rows] = await connection.query(
            `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
            [process.env.MYSQL_DB],
        );

        if (rows.length > 0) {
            console.log(
                `La base de datos "${process.env.MYSQL_DB}" ya existe.`,
            );

            // Eliminamos la base de datos existente
            await connection.query(`DROP DATABASE ${process.env.MYSQL_DB}`);
            console.log(
                `Base de datos "${process.env.MYSQL_DB}" borrada con éxito.`,
            );

            // Creamos la base de datos nuevamente
            await connection.query(`CREATE DATABASE ${process.env.MYSQL_DB}`);
            console.log(
                `Base de datos "${process.env.MYSQL_DB}" creada exitosamente.`,
            );
        } else {
            // La base de datos no existe, la creamos directamente
            await connection.query(`CREATE DATABASE ${process.env.MYSQL_DB}`);
            console.log(
                `Base de datos "${process.env.MYSQL_DB}" creada exitosamente.`,
            );
        }

        // Usamos la base de datos recién creada
        await connection.query(`USE ${process.env.MYSQL_DB}`);

        // Creamos las tablas individualmente
        await createTables(connection);

        // Introducimos datos de ejemplo
        await insertSampleData(connection);
    } catch (error) {
        console.error('Error creating database and tables:', error.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

async function createTables(connection) {
    try {
        // Creamos la tabla Usuarios
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                date DATE,
                avatar VARCHAR(255),
                registrationCode VARCHAR(255),
                recoverPassCode VARCHAR(255),
                active BOOLEAN DEFAULT false,
                role ENUM('admin','public') DEFAULT 'public',
                register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Creamos la tabla Experiencias
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Experiences (
                id INT AUTO_INCREMENT PRIMARY KEY,
                creator_id INT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                type ENUM('Relajado', 'Medio', 'Adrenalina pura') NOT NULL,
                city VARCHAR(255),
                image VARCHAR(255),
                date DATE,
                price DECIMAL(10, 2),
                min_places INT,
                total_places INT,
                active BOOLEAN DEFAULT true,
                creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (creator_id) REFERENCES Users(id)
            )
        `);

        // Creamos la tabla Reservas
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Reservations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                experience_id INT,
                reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (experience_id) REFERENCES Experiences(id)
            )
        `);

        // Creamos la tabla Comentarios
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                experience_id INT,
                content TEXT,
                rate INT CHECK(rate >= 0 AND rate <= 5),
                comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (experience_id) REFERENCES Experiences(id)
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS Ratings(
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            experience_id INT,
            rating INT CHECK(rating >= 1 AND rating <= 5),
            FOREIGN KEY (user_id) REFERENCES Users(id),
            FOREIGN KEY (experience_id) REFERENCES Experiences(id)
        )
        `);

        console.log('Tablas creadas exitosamente.');
    } catch (error) {
        console.error('Error al crear las tablas:', error.message);
    }
}

createDatabaseAndTables();
