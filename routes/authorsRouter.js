import { Router } from "express";
import { createAuthor, deleteAuthor, getAuthorById, listAuthors, updateAuthor } from "../controllers/authorController.js";
import { validarCampos,} from "../middlewares/validarCampos.js";
import { active, authorId, birthYear, name, nationality } from "../validators/authorsValidators.js";
// import { authorId, name, nationality, birthYear, active } from "../validators/authorsValidators.js";

const router = Router()


router.get("/", listAuthors)
router.post("/", [name, nationality, birthYear, active, validarCampos], createAuthor)
router.get("/:id", [authorId, validarCampos], getAuthorById)
router.put("/:id", [authorId, nationality, birthYear, active, validarCampos], updateAuthor)
router.delete("/:id", [authorId, validarCampos], deleteAuthor)



export default router  