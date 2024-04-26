export const notFoundError = (resource) => {
    throw {
        httpStatus: 404,
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso ${resource} no fue encontrado`,
    };
};

export const userAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'USER_ALREADY_REGISTERED',
        message: 'El nombre de usuario ya está registrado',
    };
};

export const emailAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'EMAIL_ALREADY_REGISTERED',
        message: 'El email ya está registrado',
    };
};

export const sendEmailError = () => {
    throw {
        httpStatus: 500, // Internal server Error
        code: 'SEND_EMAIL_REGISTERED',
        message: 'Error al enviar email',
    };
};

export const userNotExistError = () => {
    throw {
        httpStatus: 409, // Conflict
        status: 'error',
        code: 'USERNAME_NOT_EXIST',
        message: 'El usuario no existe',
    };
};

export const userNotValidPasswordError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'PASSWORD_NOT_VALID',
        message: 'La constraseña no es válida',
    };
};
