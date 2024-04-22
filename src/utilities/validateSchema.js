// Función que valida un esquema. Primer parámetro es el schema de Joi y el
// segundo parámetro un objeto con las propiedades que queremos validar.
const validateSchema = async (schema, data) => {
    try {
        await schema.validateAsync(data);
    } catch (err) {
        err.httpStatus = 400;
        throw err;
    }
};

export default validateSchema;