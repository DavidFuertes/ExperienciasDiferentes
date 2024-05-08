import { notAuthUser } from '../services/errorService.js';

export const adminMiddleware = (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin') {
        notAuthUser();
    }

    next();
};
