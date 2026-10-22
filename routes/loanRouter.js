import { Router } from "express";
import { createLoan, getMyLoans, returnLoan, getLoans, getOverdueLoans } from "../controllers/loanController.js";
import { validarCrearPrestamo, validarDevolucion, validarFiltroEstado } from "../validators/loanValidators.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { tieneRol } from "../middlewares/validateRoles.js";

const router = Router();

router.get("/me", validateJWT, getMyLoans);
router.get("/overdue", validateJWT, tieneRol("ADMIN"), getOverdueLoans);
router.post("/", validateJWT, validarCrearPrestamo, createLoan);
router.get("/", validateJWT, tieneRol("ADMIN"), validarFiltroEstado, getLoans);
router.patch("/:id/return", validateJWT, validarDevolucion, returnLoan);

export default router;