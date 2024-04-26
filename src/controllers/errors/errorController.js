export const errorController = (error, req, res, next) => {
    console.log(error.httpStatus);
    res.status(error.httpStatus || 500);
    res.send({
        status: error.httpStatus,
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
    });
};
