import { errorController } from '../controllers/errors/errorController.js';
import selectUserByEmailModel from '../models/users/selectUserByEmailModel.js';
import { selectUserByIdModel } from '../models/users/selectUserByIdModel.js';
import selectUserByNameModel from '../models/users/selectUserByNameModel.js';
import { updateUserProfileModel } from '../models/users/updateUserProfileModel.js';
import {
    emailAlreadyRegisteredError,
    userAlreadyRegisteredError,
} from '../services/errorService.js';

export const updateProfileService = async (userId, body) => {
    const { name, email, date, residence, languages, avatar } = body;
    let existUser = await selectUserByNameModel(name);
    if (existUser && existUser.id !== userId) {
        userAlreadyRegisteredError();
    }

    existUser = await selectUserByEmailModel(email);
    if (existUser && existUser.id !== userId) {
        emailAlreadyRegisteredError();
    }

    await updateUserProfileModel(
        userId,
        name,
        email,
        date,
        avatar,
        residence,
        languages,
    );

    const user = await selectUserByIdModel(userId);

    return user;
};
