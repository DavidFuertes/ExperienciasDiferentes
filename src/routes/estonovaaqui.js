// Importamos las dependencias.
import express from 'express';
import mysql from 'mysql2/promise';

// Endpoint para obtener experiencias con filtros y ordenación
app.get('/experiences', (req, res) => {
    const { title, location, isActive, isConfirmed, sortBy, sortOrder } =
        req.query;
    let query = 'SELECT * FROM Experiences WHERE 1=1';

    // Aplica los filtros según los parámetros de consulta
    if (title) query += ` AND title LIKE '%${title}%'`;
    if (location) query += ` AND location LIKE '%${location}%'`;
    if (isActive !== undefined)
        query += ` AND isActive = ${isActive === 'true' ? 1 : 0}`;
    if (isConfirmed !== undefined)
        query += ` AND isConfirmed = ${isConfirmed === 'true' ? 1 : 0}`;

    // Aplica la ordenación si se proporcionan parámetros de orden
    if (sortBy && sortOrder) {
        query += ` ORDER BY ${sortBy} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`;
    }

    // Ejecuta la consulta SQL en MySQL
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err);
            res.status(500).json({ message: 'Error al obtener experiencias.' });
        } else {
            res.json(results);
        }
    });
});

// // Escucha del servidor en el puerto 3000
// app.listen(3000, () => {
//     console.log('Servidor escuchando en el puerto 3000');
// });
