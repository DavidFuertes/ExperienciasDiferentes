
export const notFoundError = (resource) => {
    throw {
        httpStatus: 404,
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso ${resource} no fue encontrado`,
    };
};

