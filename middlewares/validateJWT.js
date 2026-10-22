import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(id);

        if (!user || !user.active) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido - usuario no existe en la base de datos'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
};