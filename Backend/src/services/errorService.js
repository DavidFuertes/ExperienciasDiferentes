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

export const userNotValid = () => {
    throw {
        httpStatus: 403,
        code: 'USER_NOT_VALID',
        message: 'El usuario no es válido',
    };
};

export const invalidCredentialsError = () => {
    throw {
        httpStatus: 401,
        code: 'CREDENTIALS_NOT_VALID',
        message: 'El usuario y/o la constraseña no son correctas',
    };
};

export const invalidToken = () => {
    throw {
        httpStatus: 401,
        code: 'INVALID_TOKEN',
        message: 'El token es inválido',
    };
};

export const userNotActive = () => {
    throw {
        httpStatus: 403,
        code: 'USER_NOT_ACTIVE',
        message: 'Debes confirmar tu cuenta antes de iniciar sesión',
    };
};

export const notAuthUser = () => {
    throw {
        httpStatus: 403,
        code: 'USER_NOT_AUTHORIZED',
        message: 'Este usuario no tiene los permisos necesarios',
    };
};

export const experienceNotExistError = () => {
    throw {
        httpStatus: 409,
        status: 'error',
        code: 'EXPERIENCE_NOT_EXIST',
        message: 'La experiencia no existe o ha sido eliminada',
    };
};


export const invalidRecoveryCodeError = () => {
    throw {
        httpStatus: 400, // Bad Request
        code: 'INVALID_RECOVERY_CODE',
        message: 'El código de recuperación de contraseña es inválido',

export const failedUserUpdate = () => {
    throw {
        httpStatus: 500,
        code: 'UPDATE_USER_ERROR',
        message: 'No se ha podido actualizar el perfil',
    };
};

export const failedAvatarError = () => {
    throw {
        httpStatus: 500,
        code: 'UPDATE_USER_AVATAR_ERROR',
        message: 'No se ha podido actualizar el avatar',

    };
};
