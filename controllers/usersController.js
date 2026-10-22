import { request } from "express";
import Users from "../models/userModels.js";
import bcrypt from "bcryptjs";
import { generarJWT } from '../helpers/generar-jwt.js';


export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existeUsuario = await Users.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ ok: false, msg: 'El correo electrónico ya se encuentra registrado' });
    }


    const nuevoUsuario = new Users({ name, email, password });
    await nuevoUsuario.save();

    const token = await generarJWT(nuevoUsuario._id);

    return res.status(201).json({
      ok: true,
      data: { user: nuevoUsuario, token }
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email, active: true });
        if (!usuario) {
            return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
        }

        const passwordValido = await bcrypt.compare(password, user.password);
        if (!passwordValido) {
            return res.status(401).json({ 
                ok: false, 
                msg: 'Credenciales inválidas'
             });
        }

        const token = generarJWT(user._id);

        return res.status(200).json({
            ok: true,
            data: { user: user, token}
        });
    } catch (error) {
        return res.status(500).json({ 
            ok: false,
            msg: 'Error en el servidor'
        });
    }
}

export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      ok: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const usuarios = await Users.find({ active: true })
    .skip(skip)
    .limit(limit);

    const total = await Users.countDocuments({ active: true });

    return res.status(200).json({
      ok: true,
      data: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        users: usuarios
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const usuarioActualizado = await Users.findByIdAndUpdate(
      id,
      { role },
      { returnDocument: "after", runValidators: true } 
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      ok: true,
      msg: 'Rol actualizado con éxito',
      data: usuarioActualizado
    });
  } catch (error) {
    next(error);
  }
};



 