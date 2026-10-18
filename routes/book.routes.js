import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { createBook, getBook, getBooks, availableBooks, updateBook, deletebook } from "../controllers/bookcontroller.js";

const router = Router()

router.get("/", getBooks)
router.post("/", createBook)
router.put("/:id", updateBook)
router.delete("/:id", deletebook)

export default router