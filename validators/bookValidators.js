import { check } from "express-validator";
import { validateFields} from "../middlewares/validateFields.js";
import { isbnExiste, existeAutorPorId } from "../helpers/db-validators.js";

const generos = ["novela", "cuento", "poesia", "ensayo", "tecnologia", "historia", "infantil"];

export const validarId = [
  check("id", "El id no es válido").isMongoId(),
  validateFields,
];

export const validarCrearLibro = [
  check("title", "El título es obligatorio").notEmpty().isLength({ max: 120 }),
  check("isbn", "El ISBN debe tener 10 o 13 dígitos").matches(/^(\d{10}|\d{13})$/),
  check("isbn").custom(isbnExiste),
  check("author", "El autor no es válido").isMongoId(),
  check("author").custom(existeAutorPorId),
  check("genre", "Genero no valido").optional().isIn(generos),
  check("year", "Año no válido").optional().isInt({ max: new Date().getFullYear() }),
  check("totalCopies", "Debe ser un entero mayor o igual a 1").isInt({min: 1}),
  validateFields,
];

export const validarActualizarLibro = [
  check("id", "El id no es válido").isMongoId(),
  check("title", "El título es obligatorio").notEmpty().isLength({ max: 120 }),
  check("isbn", "El ISBN debe tener 10 o 13 dígitos").matches(/^(\d{10}|\d{13})$/),
  check("isbn").custom((isbn, { req }) => isbnExiste(isbn, req.params.id)),
  check("author", "El autor no es válido").isMongoId(),
  check("author").custom(existeAutorPorId),
  check("genre", "Genero no valido").optional().isIn(generos),
  check("year", "Año no válido").optional().isInt({ max: new Date().getFullYear() }),
  check("totalCopies", "Debe ser un entero mayor o igual a 1").isInt({min: 1}),
  validateFields,
];