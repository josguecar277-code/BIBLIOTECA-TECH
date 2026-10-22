import jwt from 'jsonwebtoken';

export const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '4h',
            },
            (error, token) => {
                if (error) {
                    console.error('Error al generar el JWT:', error);
                    reject('No se pudo generar el token de acceso');
                } else {
                    resolve(token);
                }
            }
        );
    });
};