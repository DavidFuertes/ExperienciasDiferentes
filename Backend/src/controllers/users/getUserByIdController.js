import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';

export const getUserByIdController = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await selectUserByIdModel(userId);

        res.send({
            status: 'ok',
            message: 'Datos del usuario obtenidos con éxito',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
