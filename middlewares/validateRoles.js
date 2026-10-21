import jwt from 'jsonwebtoken';
import uUser from '../models/userModels.js';


export const tieneRol = (rolRequerido) => {
    return (req, res, next) => {
        
        if (!req.user) {
            return res.status(500).json ({
                ok: false,
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if (req.user.role !== rolRequerido) {
            return res.status(403).json ({
                ok: false,
                msg: `El servicio requiere el rol de ${rolRequerido} (Acceso denegado)`
            });
        }

        next();
    };
};