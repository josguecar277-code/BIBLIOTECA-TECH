// import { request } from "express";
import Authors from "../models/authorModels.js";
import Book from "../models/bookModels.js";

export const listAuthors = async (req, res, next) => {
    try {
        
        const author = await Authors.find()

        res.status(200).json({
            ok: true,
            data:author  
        }) 

    } catch (error) {
        next(error)
    }
}

export const createAuthor = async (req, res, next) => {
    try {
        const nuevoAutor = await Authors.create(req.body);

        res.status(201).json({
            ok: true,
            data: nuevoAutor
        }); 

    } catch (error) {
        next(error);
    }
};

export const getAuthorById = async (req, res, next) => {
    try {
        const author = await Authors.findById(req.params.id);

        if (!author) {
            return res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            });
        }

        res.status(200).json({
            ok: true,
            data: author
        }); 

    } catch (error) {
        next(error);
    }
};

export const updateAuthor = async (req, res, next) => {
    try {
        
        const author = await Authors.findByIdAndUpdate(req.params.id, req.body, { new: true }); //

        if(!author) {
          return  res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            
        }

        res.status(200).json({
            msg: (author),
            ok: true,
            data: author //
        }) 

    } catch (error) {
        next(error)
    }
}

export const deleteAuthor = async (req, res, next) => {
    try {
        
        const author = await Authors.findByIdAndUpdate(req.params.id);

        if(!author) {
           return res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            
        }

        res.status(200).json({
            ok: true,
            msg: ("Autor desactivado correctamente"),
            // Authors
        }) 

    } catch (error) {
        next(error)
    }
}



 


