import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { createBook, getBook, getAllBooks, availableBooks, updateBook, deletebook } from "../controllers/bookcontroller.js";

const router = Router()

router.get("/", getAllBooks)
router.get("/available",availableBooks)
router.get("/:id",getBook)
router.post("/", createBook)
router.put("/:id", updateBook)
router.delete("/:id", deletebook)


export default router