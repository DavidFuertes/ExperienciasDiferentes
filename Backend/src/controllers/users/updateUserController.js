import { updateUserSchema } from '../../schemas/users/updateUserSchema.js';
import { updateProfileService } from '../../services/updateProfileService.js';
import validateSchema from '../../utilities/validateSchema.js';

export const updateUserController = async (req, res, next) => {
    const userId = req.user.id;
    try {
        await validateSchema(updateUserSchema, req.body);

        const user = await updateProfileService(userId, req.body);

        res.send({
            status: 'Épico',
            message: 'Perfil actualizado épicamente',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
