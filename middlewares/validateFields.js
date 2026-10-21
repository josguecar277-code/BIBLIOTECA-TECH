import { validationResult } from "express-validator";

//va siempre al final de la cadena de check(...).
//sin este middleware los checks se ejecutan pero nadie responde el 400.

export const validateFields = (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: result.array().map((e) => ({ field: e.path, msg: e.msg }))
        })
    }

    next()
}

