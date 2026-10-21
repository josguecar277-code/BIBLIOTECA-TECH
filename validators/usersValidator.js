import { check } from "express-validator";


export const registerValidators = [
  check("name", "El nombre es obligatorio y debe tener entre 3 y 60 caracteres")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 60 }),
  
  check("email", "Por favor introduce un correo con formato válido")
    .trim()
    .isEmail()
    .normalizeEmail(),
  
  check("password", "La contraseña es obligatoria y debe contener mínimo 6 caracteres")
    .isLength({ min: 6 })
];

export const loginValidators = [
  check("email", "Por favor introduce un correo con formato válido")
    .trim()
    .isEmail(),
  check("password", "La contraseña es obligatoria").notEmpty()
];

export const roleValidators = [
  check("id", "El ID proporcionado no es un ID de Mongo válido").isMongoId(),
  check("role", "El rol es obligatorio y debe ser USER o ADMIN").notEmpty().isIn(['USER', 'ADMIN'])
];
