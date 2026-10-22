import { check } from "express-validator";


const name = check("name", "El nombre es obligatorio").trim().not().isEmpty()
.isString().withMessage("El nombre debe ser un texto")
.isLength({min: 3, max:50}).withMessage("El nombre debe tener entre 3 y 50 caracteres")
.custom ((value) => {
    if (value.toLowerCase().includes("author")) {
        throw new Error("El nombre no puede contener la palabra 'author'");
    } //300
    return true;
});

const nationality = check("nationality").optional().trim().not().isEmpty()
.isString().withMessage("La nacionalidad debe ser un texto")
.isLength({ min: 2, max: 40 }).withMessage("La nacionalidad debe tener entre 2 y 40 caracteres")
.custom ((value) => {
    if (value.toLowerCase().includes("nationality")) {
        throw new Error("La nacionalidad no puede contener la palabra 'nationality'");
    }
    return true;
});


const birthYear = check("birthYear").optional().trim().not().isEmpty()
.isInt({ min: 0, max: new Date().getFullYear() })
.withMessage(`El año de nacimiento debe ser un número entero válido (entre 0 y ${new Date().getFullYear()})`);


const active = check("active").optional() //.trim().not().isEmpty()
.isBoolean().withMessage('El campo Active debe ser un valor booleano (true o false)');

const authorId = check("id", "El id no es válido")
.not().isEmpty().isMongoId("El id no es valido")
.withMessage("El id debe ser un id de mongo válido")


export  {
    name,
    nationality,
    birthYear,
    active,
    authorId
}

