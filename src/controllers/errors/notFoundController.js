import { notFoundError } from '../../services/errorService.js';

export const notFoundController = (req, res, next) => {
    // Obtener la ruta solicitada
    const resourcePath = req.path;

    // Lanzar un error de recurso no encontrado
    next(notFoundError(resourcePath));
};
