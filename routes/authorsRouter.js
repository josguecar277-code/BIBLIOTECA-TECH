import { Router } from "express";
import { createAuthor, deleteAuthor, getAuthorById, listAuthors, updateAuthor } from "../controllers/authorController.js";
// import { authorId, name, nationality, birthYear, active } from "../validators/authorsValidators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { active, authorId, birthYear, name, nationality } from "../validators/authorsValidator.js";

const router = Router()


router.get("/", listAuthors)
router.post("/", [name, nationality, birthYear, active], createAuthor)
router.get("/:id", [authorId, validateFields], getAuthorById)
router.put("/:id", [authorId, nationality, birthYear, active, validateFields], updateAuthor)
router.delete("/:id", [authorId, validateFields], deleteAuthor)



export default router 