import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";

export const validarCrearPrestamo = [
  check("book", "El libro no es válido").isMongoId(),
  validateFields,
];

export const validarDevolucion = [
  check("id", "El id no es válido").isMongoId(),
  validateFields,
];

export const validarFiltroEstado = [
  check("status", "Estado no válido").optional().isIn(["ACTIVE", "RETURNED"]),
  validateFields,
];  