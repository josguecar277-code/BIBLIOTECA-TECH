import { Router } from "express";
import { check } from "express-validator";
import { createUser, login, me } from "../controllers/usersController.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import User from "../models/userModels.js";

const router = Router();

router.post("/register", [
  check("name", "El nombre debe tener entre 3 y 60 caracteres").isLength({ min: 3, max: 60 }),
  check("email", "El correo no es válido").isEmail(),
  check("email").custom(async (email) => {
    if (await User.findOne({ email: email.toLowerCase() })) {
      throw new Error("El correo ya está registrado");
    }
  }),
  check("password", "Mínimo 6 caracteres").isLength({ min: 6 }),
  validarCampos,
], createUser);

router.post("/login", [
  check("email", "El correo no es válido").isEmail(),
  check("password", "La contraseña es obligatoria").notEmpty(),
  validarCampos,
], login);

router.get("/me", validateJWT, me);

export default router;