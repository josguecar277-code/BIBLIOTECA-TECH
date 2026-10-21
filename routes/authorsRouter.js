import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import { tieneRol } from "../middlewares/validateRoles.js";
import { validateFields } from "../middlewares/validateFields.js";
import { createAuthor, deleteAuthor, getAuthorById, listAuthors, updateAuthor } from "../controllers/authorsController.js";
import { active, authorId, birthYear, name, nationality } from "../validators/authorsValidator.js";

const router = Router()


router.get("/", listAuthors)
router.post("/", [validateJWT, tieneRol('ADMIN'), name, nationality, birthYear, active, validateFields], createAuthor)
router.get("/:id", [authorId, validateFields], getAuthorById)
router.put("/:id", [validateJWT, tieneRol('ADMIN'), authorId, nationality, birthYear, active, validateFields], updateAuthor)
router.delete("/:id", [validateJWT, tieneRol('ADMIN'), authorId, validateFields], deleteAuthor)



export default router 