import { getPool } from "../../db/poolQuery.js";

async function listExperiences(req, res) {

    const experienceReq = req.body;
    const { title, city, isActive, isConfirmed, sortBy, sortOrder } = experienceReq;
    
    try {

        const pool = await getPool();

        let reqInfo = 'SELECT * FROM Experiences WHERE 1=1';

        if (title) {
            reqInfo += ` AND title LIKE '%${title}%'`
        };
        if (city) {
            reqInfo += ` AND city LIKE '%${city}%'`
        };
        if (isActive !== undefined) {
            reqInfo += ` AND active = ${isActive}`
        };
        if (isConfirmed !== undefined) {
            reqInfo += ` AND isConfirmed = ${isConfirmed === 'true' ? 1 : 0}`
        };
    
        // Aplica la ordenación si se proporcionan parámetros de orden
        if (sortBy && sortOrder) {
            reqInfo += ` ORDER BY ${sortBy} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}`
        };

        const [listedExperiences] = await pool.query(reqInfo);


        res.json(listedExperiences);

        

    } catch (error) {
        res.send({
            message: 'NO'
        })
        console.log(error.message)
    }

}

export { listExperiences };