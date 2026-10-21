import { request } from "express";
import Authors from "../models/authorModels.js";

export const listAuthors = async (req, res, next) => {
    try {
        
        const author = await Authors.find()

        res.status(200).json({
            ok: true,
            author  
        }) 

    } catch (error) {
        next(error)
    }
}

export const createAuthor = async (req, res, next) => {
    try {
        
        const nuevo = await Authors.create(req.body)

        console.log(nuevo)

        res.status(200).json({
            msg: (nuevo),
            ok: true,
            Authors
        }) 

    } catch (error) {
        next(error)
    }
}

export const getAuthorById = async (req, res, next) => {
    try {
        
        const author = await Authors.findById(req.params.id)

        if(!author) {
            res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            return
        }

        res.status(200).json({
            msg: (author),
            ok: true,
            Authors
        }) 

    } catch (error) {
        next(error)
    }
}

export const updateAuthor = async (req, res, next) => {
    try {
        
        const author = await Authors.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!author) {
            res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            return
        }

        res.status(200).json({
            msg: (author),
            ok: true,
            Authors
        }) 

    } catch (error) {
        next(error)
    }
}

export const deleteAuthor = async (req, res, next) => {
    try {
        
        const author = await Authors.findByIdAndDelete(req.params.id);

        if(!author) {
            res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            return
        }

        res.status(200).json({
            msg: ("Autor eliminado correctamente"),
            ok: true,
            Authors
        }) 

    } catch (error) {
        next(error)
    }
}



 


