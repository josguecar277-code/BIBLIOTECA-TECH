import { request } from "express";
import bcrypt from "bcryptjs";      
import Users from "../models/userModels.js";
import { generarJWT } from '../helpers/generar-jwt.js';   

export const listUsers = async (req, res, next) => {
    try {
        
        const user = await Users.find()

        res.status(200).json({
            ok: true,
            user
        }) 

    } catch (error) {
        next(error)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body       
        const nuevo = await Users.create({ name, email, password })
        const token = await generarJWT(nuevo._id)           

        console.log(nuevo)

        res.status(201).json({                       
            user: nuevo,
            token
        })

    } catch (error) {
        next(error)
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });
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

        const token = await generarJWT(user._id);

        return res.status(200).json({
            ok: true,
            user: user,
            token
        });
    } catch (error) {
        return res.status(500).json({ 
            ok: false,
            msg: 'Error en el servidor'
        });
    }
    
}
export const me = (req, res) => {  
      res.status(200).json({ ok: true, user: req.user })
}


 