export const errorController = (error, req, res, next) => {
    console.log(
        `Error: ${error.httpStatus || 500}	| ${error.code || 'INTERNAL_SERVER_ERROR'} | ${error.message} `,
    );
    res.status(error.httpStatus || 500);
    res.send({
        status: error.httpStatus,
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
    });
};
