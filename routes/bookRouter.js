import { Router } from "express";
import { createBook, getBook, getAllBooks, availableBooks, updateBook, deletebook } from "../controllers/bookController.js";
import { validarId, validarCrearLibro, validarActualizarLibro } from "../validators/bookValidators.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { tieneRol } from "../middlewares/validateRoles.js";

const router = Router();

router.get("/available", availableBooks);
router.get("/:id", validarId, getBook);
router.get("/", getAllBooks);
router.post("/",  validarCrearLibro, createBook);
router.put("/:id", validateJWT, tieneRol("ADMIN"), validarActualizarLibro, updateBook);
router.delete("/:id", validateJWT, tieneRol("ADMIN"), validarId, deletebook);

export default router;


// post en create validateJWT, tieneRol("ADMIN"),