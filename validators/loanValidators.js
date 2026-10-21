import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";

export const validarCrearPrestamo = [
  check("book", "El libro no es válido").isMongoId(),
  validarCampos,
];

export const validarDevolucion = [
  check("id", "El id no es válido").isMongoId(),
  validarCampos,
];

export const validarFiltroEstado = [
  check("status", "Estado no válido").optional().isIn(["ACTIVE", "RETURNED"]),
  validarCampos,
];  