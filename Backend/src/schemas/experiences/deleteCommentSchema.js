import joi from 'joi';

// Importamos joiErrorMessages.
import joiErrorMessages from '../joiErrorMessages.js';

export const deleteCommentSchema = joi.object({
    commentId: joi.number().required().messages(joiErrorMessages),
});
