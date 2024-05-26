import pool from './getPool.js';
import dotenv from 'dotenv';

dotenv.config();

const {
    DEFAULT_AVATAR_URL,
    DEFAULT_RELAJADO_URL,
    DEFAULT_MEDIO_URL,
    DEFAULT_ADRENALINA_URL,
} = process.env;

async function insertSampleData(connection) {
    try {
        // Metemos datos en la tabla Users
        await connection.query(`
        INSERT INTO Users (name, email, password, date, avatar, active, role) VALUES
        ('Admin', 'admin@admin.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1990-01-01', '${DEFAULT_AVATAR_URL}', 1, 'admin'),
        ('Juan Pérez', 'juanperez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1990-01-01', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('María García', 'mariagarcia@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1995-03-15', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Pedro Rodríguez', 'pedrorodriguez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1992-12-10', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Laura Martínez', 'lauramartinez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1985-05-03', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Carlos López', 'carloslopez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1987-09-28', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Sofía Hernández', 'sofiahernandez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1998-02-14', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Diego García', 'diegogarcia@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1983-11-30', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Elena Martín', 'elenamartin@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1991-04-25', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Mario Sánchez', 'mariosanchez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1984-08-17', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Carmen Pérez', 'carmenperez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1993-06-05', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Alejandro Gutiérrez', 'alejandrogutierrez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1989-10-12', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Ana Rosa Fernández', 'anarosafernandez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1986-01-08', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Javier Ruiz', 'javierruiz@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1997-07-23', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Lucía Díaz', 'luciadiaz@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1982-04-16', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Marcos Castro', 'marcoscastro@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1990-12-03', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Raquel Navarro', 'raquelnvarro@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1987-09-18', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Manuel Serrano', 'manuelserrano@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1985-03-09', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Silvia Ramos', 'silviaramos@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1992-06-21', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Óscar Morales', 'oscarmorales@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1988-11-13', '${DEFAULT_AVATAR_URL}', 1, 'public'),
        ('Ana Gómez', 'anagomez@example.com', '$2b$10$wO.Qo9wEw47JhJ9t9HmK4e7qUfqxu8UqRKU0Xd/D0FWYhF/CA01zu', '1988-07-20', '${DEFAULT_AVATAR_URL}', 1, 'public');
    `);

        //  Metemos datos en la tabla Experiences
        await connection.query(`
   INSERT INTO Experiences (creator_id, title, description, type, city, image, date, price, min_places, total_places, active)
            VALUES
            (1, 'Exploración Submarina', 'Descubre la vida marina en una emocionante exploración submarina.', 'Adrenalina pura', 'Oceanview', '${DEFAULT_ADRENALINA_URL}', '2024-08-25', 70.00, 3, 8, false),
            (1, 'Tour en Helicóptero', 'Disfruta de una vista panorámica desde un helicóptero.', 'Adrenalina pura', 'Skyline', '${DEFAULT_ADRENALINA_URL}', '2024-08-28', 120.00, 2, 6, false),
            (1, 'Bungee Jumping', 'Salta desde un puente en esta experiencia de bungee jumping.', 'Adrenalina pura', 'Bridgeview', '${DEFAULT_ADRENALINA_URL}', '2024-08-30', 90.00, 1, 4, false),
            (1, 'Recorrido en Moto de Nieve', 'Atraviesa la nieve en una emocionante excursión en moto de nieve.', 'Adrenalina pura', 'Snowland', '${DEFAULT_ADRENALINA_URL}', '2024-09-02', 80.00, 2, 6, false),
            (1, 'Espeleología', 'Explora cuevas subterráneas en esta aventura de espeleología.', 'Adrenalina pura', 'Caveview', '${DEFAULT_ADRENALINA_URL}', '2024-09-05', 60.00, 3, 8, false),
            (1, 'Rappel en Cascada', 'Desciende por una cascada en una experiencia de rappel.', 'Adrenalina pura', 'Waterfall', '${DEFAULT_ADRENALINA_URL}', '2024-09-08', 75.00, 2, 6, false),
            (1, 'Tour en Globo Aerostático al Amanecer', 'Observa el amanecer desde un globo aerostático.', 'Relajado', 'Sunrise', '${DEFAULT_RELAJADO_URL}', '2024-09-10', 100.00, 2, 6, false),
            (1, 'Pesca en Alta Mar', 'Disfruta de una emocionante jornada de pesca en alta mar.', 'Adrenalina pura', 'Deepsea', '${DEFAULT_ADRENALINA_URL}', '2024-09-12', 45.00, 4, 10, false),
            (1, 'Paseo en Tren Escénico', 'Recorre paisajes impresionantes en un pintoresco tren escénico.', 'Relajado', 'Scenicview', '${DEFAULT_RELAJADO_URL}', '2024-09-15', 30.00, 3, 8, false),
            (1, 'Tour en Autogiro', 'Descubre la ciudad desde las alturas en un autogiro.', 'Adrenalina pura', 'Skyview', '${DEFAULT_ADRENALINA_URL}', '2024-09-18', 85.00, 2, 6, false),
            (1, 'Aventura en las Montañas', 'Experimenta la emoción de hacer senderismo en las montañas.', 'Adrenalina pura', 'Mountainville', '${DEFAULT_ADRENALINA_URL}', '2024-08-01', 50.00, 5, 10, true),
            (1, 'Tour por la Ciudad', 'Explora la ciudad y sus puntos de referencia.', 'Relajado', 'Cityville', '${DEFAULT_RELAJADO_URL}', '2024-07-15', 30.00, 3, 8, true),
            (1, 'Ruta en Kayak por el Río', 'Disfruta de un emocionante paseo en kayak por el río.', 'Adrenalina pura', 'Riverdale', '${DEFAULT_ADRENALINA_URL}', '2024-07-30', 40.00, 4, 12, true),
            (1, 'Escalada en Roca', 'Experimenta la emoción de escalar montañas.', 'Adrenalina pura', 'Rockville', '${DEFAULT_ADRENALINA_URL}', '2024-08-10', 60.00, 2, 6, true),
            (1, 'Paseo en Velero al Atardecer', 'Relájate mientras navegas en un velero al atardecer.', 'Relajado', 'Seaside', '${DEFAULT_RELAJADO_URL}', '2025-06-25', 80.00, 2, 4, true),
            (1, 'Tour de Cata de Vinos', 'Descubre la variedad de vinos en una cata organizada.', 'Relajado', 'Wineville', '${DEFAULT_RELAJADO_URL}', '2025-07-10', 25.00, 4, 10, true),
            (1, 'Excursión a la Cascada', 'Explora la belleza natural de una cascada escondida.', 'Medio', 'Fallsburg', '${DEFAULT_MEDIO_URL}', '2024-08-05', 35.00, 3, 8, true),
            (1, 'Paseo en Globo Aerostático', 'Observa la vista panorámica desde un globo aerostático.', 'Relajado', 'Skyview', '${DEFAULT_RELAJADO_URL}', '2024-07-28', 100.00, 2, 6, true),
            (1, 'Barranquismo en el Cañón', 'Desafía la naturaleza con descensos de barrancos en el cañón.', 'Adrenalina pura', 'Canyonland', '${DEFAULT_ADRENALINA_URL}', '2025-08-15', 70.00, 2, 6, true),
            (1, 'Senderismo en el Bosque', 'Embárcate en una tranquila caminata por el bosque.', 'Relajado', 'Woodland', '${DEFAULT_RELAJADO_URL}', '2025-07-22', 20.00, 5, 15, true),
            (1, 'Tour en Bicicleta por la Montaña', 'Recorre las montañas en bicicleta en este emocionante tour.', 'Medio', 'Mountainview', '${DEFAULT_MEDIO_URL}', '2024-08-03', 45.00, 3, 10, true),
            (1, 'Curso de Surf', 'Aprende a surfear las olas en este emocionante curso.', 'Adrenalina pura', 'Surftown', '${DEFAULT_ADRENALINA_URL}', '2025-08-20', 55.00, 4, 12, true),
            (1, 'Recorrido en Segway por la Ciudad', 'Descubre la ciudad en un recorrido en segway.', 'Relajado', 'Segwayville', '${DEFAULT_RELAJADO_URL}', '2024-07-18', 35.00, 2, 6, true),
            (1, 'Excursión en 4x4 por el Desierto', 'Embárcate en una emocionante aventura en el desierto en un vehículo 4x4.', 'Adrenalina pura', 'Desertland', '${DEFAULT_ADRENALINA_URL}', '2025-08-08', 75.00, 3, 8, true),
            (1, 'Avistamiento de Ballenas', 'Disfruta de la majestuosidad de las ballenas en alta mar.', 'Medio', 'Whalewatch', '${DEFAULT_MEDIO_URL}', '2024-08-12', 65.00, 2, 6, true),
            (1, 'Ruta en Quad por la Montaña', 'Explora las montañas en un emocionante recorrido en quad.', 'Adrenalina pura', 'Quadville', '${DEFAULT_ADRENALINA_URL}', '2025-08-17', 70.00, 4, 10, true),
            (1, 'Excursión en Canoa por el Lago', 'Navega tranquilamente en una canoa por el lago.', 'Relajado', 'Lakeview', '${DEFAULT_RELAJADO_URL}', '2024-07-26', 30.00, 3, 8, true),
            (1, 'Camping bajo las Estrellas', 'Acampa y disfruta de la naturaleza bajo un cielo estrellado.', 'Relajado', 'Starrynight', '${DEFAULT_RELAJADO_URL}', '2025-08-31', 40.00, 4, 10, true),
            (1, 'Visita a una Plantación de Té', 'Descubre el proceso de producción del té en una plantación.', 'Relajado', 'Teaville', '${DEFAULT_RELAJADO_URL}', '2024-07-29', 25.00, 2, 6, true),
            (1, 'Curso de Equitación', 'Aprende a montar a caballo con este curso de equitación.', 'Medio', 'Horsetown', '${DEFAULT_MEDIO_URL}', '2025-08-06', 50.00, 2, 6, true),
            (1, 'Trekking en Glaciar', 'Explora un glaciar en una emocionante excursión de trekking.', 'Adrenalina pura', 'Glacierland', '${DEFAULT_ADRENALINA_URL}', '2024-08-11', 85.00, 3, 8, true),
            (1, 'Observación de Aves', 'Embárcate en una emocionante aventura para avistar aves.', 'Medio', 'Birdwatch', '${DEFAULT_MEDIO_URL}', '2025-08-14', 30.00, 3, 10, true);
            
                
        `);

        // Insert sample data into the Reservations table
        await connection.query(`
            INSERT INTO Reservations (user_id, experience_id)
            VALUES
            (2, 1),
            (2, 2),
            (3, 2),
            (3, 22),
            (4, 3),
            (4, 7),
            (4, 23),
            (5, 4),
            (5, 10),
            (5, 24),
            (6, 5),
            (6, 25),
            (7, 6),
            (7, 26),
            (7, 15),
            (8, 7),
            (8, 27),
            (9, 8),
            (9, 28),
            (10, 9),
            (10, 29),
            (11, 10),
            (11, 30),
            (12, 11),
            (13, 4),
            (13, 12),
            (14, 8),
            (14, 13),
            (15, 14),
            (15, 7),
            (16, 5),
            (16, 15),
            (17, 3),
            (17, 16),
            (18, 17),
            (18, 1),
            (19, 18),
            (20, 3),
            (20, 19),
            (21, 20)
        `);

        // Insert sample data into the Comments table
        await connection.query(`
            INSERT INTO Comments (user_id, experience_id, content, rate)
            VALUES
            (2, 1, '¡Experiencia increíble!', 5),
            (2, 2, '¡Buen tour, me encantó!', 4),
            (3, 2, 'Fue emocionante, lo volvería a hacer.', 5),
            (5, 4, 'Regular, esperaba más.', 3),
            (6, 5, 'Increíble vista desde el helicóptero.', 5),
            (7, 6, 'No fue lo que esperaba, decepcionante.', 2),
            (8, 7, '¡Muy divertido!, lo recomendaría.', 4),
            (9, 8, 'No me gustó mucho, podría mejorar.', 3),
            (10, 9, 'Maravilloso, superó mis expectativas.', 5),
            (11, 10, 'Bueno pero caro para lo que ofrece.', 3),
            (17, 3, 'Más difícil de lo que pensaba, pero emocionante.', 4),
            (13, 4, 'Aburrido, no lo recomendaría.', 2),
            (14, 8, 'Experiencia interesante, pero esperaba más.', 3),
            (15, 7, 'Buen tour, pero muy corto.', 4),
            (18, 1, 'Disfruté mucho.', 5),
            (5, 10, 'No cumplió mis expectativas, muy caro.', 2),
            (20, 3, 'Increíble experiencia, lo volvería a hacer.', 5),
            (16, 5, 'Interesante, pero podría mejorar.', 3),
            (8, 7, 'Superó mis expectativas, fue genial.', 5),
            (4, 7, 'Bueno, pero esperaba más.', 3)
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
                register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                residence VARCHAR(255),
                languages VARCHAR(255)
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
                    FOREIGN KEY (experience_id) REFERENCES Experiences(id),
                    UNIQUE(user_id, experience_id)
                );
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
                rating INT CHECK(rating >= 1 AND rating <= 5) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (experience_id) REFERENCES Experiences(id),
                UNIQUE(user_id, experience_id)
            )
            `);

        console.log('Tablas creadas exitosamente.');
    } catch (error) {
        console.error('Error al crear las tablas:', error.message);
    }
}

createDatabaseAndTables();
