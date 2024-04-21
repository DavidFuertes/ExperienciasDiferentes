// createDatabase.js
import pool from './getPool.js';
import dotenv from 'dotenv';

dotenv.config();

async function createTables() {
    let connection;
    try {
        // Obtenemos una conexión del pool
        connection = await pool.getConnection();

        // Ejecutamos la consulta SQL para usar la base de datos
        await connection.query(`USE ${process.env.MYSQL_DB}`);

        // Creamos la tabla Users
        await connection.query(`
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
      )
    `);

        // Creamos la tabla Experiences
        await connection.query(`
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
      )
    `);

        // Creamos la tabla Reservations
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

        // Creamos la tabla Comments
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

        console.log('Tablas creadas exitosamente.');
    } catch (error) {
        console.error('Error al crear las tablas:', error.message);
    } finally {
        if (connection) {
            // Liberamos la conexión solo si está abierta
            connection.release();
        }
        // Cerramos todas las conexiones del pool
        pool.end();
    }
}

createTables();
