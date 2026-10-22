import { Router } from "express";
import { createBook, getBook, getAllBooks, availableBooks, updateBook, deletebook } from "../controllers/bookcontroller.js";
import { validarId, validarCrearLibro, validarActualizarLibro } from "../validators/bookValidators.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { tieneRol } from "../middlewares/validateRoles.js";

const router = Router();

router.get("/", getAllBooks);
router.get("/available", availableBooks);
router.get("/:id", validarId, getBook);
router.post("/", validateJWT, tieneRol("ADMIN"), validarCrearLibro, createBook);
router.put("/:id", validateJWT, tieneRol("ADMIN"), validarActualizarLibro, updateBook);
router.delete("/:id", validateJWT, tieneRol("ADMIN"), validarId, deletebook);

export default router;