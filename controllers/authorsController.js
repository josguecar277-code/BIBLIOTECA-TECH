import { request } from "express";
import Authors from "../models/authorModels.js";

export const listAuthors = async (req, res, next) => {
    try {
        
        const author = await Authors.find({ active: true });

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
            data: nuevo
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

        // const books = await Books.find({ author: id, active: true });

        res.status(200).json({
            msg: (author),
            ok: true,
            Authors
            // data: { author, books: libros }
        }) 

    } catch (error) {
        next(error)
    }
}

export const updateAuthor = async (req, res, next) => {
    try {
        
        const author = await Authors.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after", runValidators: true });

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
            data: author
        }) 

    } catch (error) {
        next(error)
    }
}

export const deleteAuthor = async (req, res, next) => {
    try {
        
        const author = await Authors.findByIdAndDelete(req.params.id, { active: false, returnDocument: "after"});
        
        // const tieneLibrosActivos = await mongoose.model('Book').findOne({ author: id, active: true });
        //     if (tieneLibrosActivos) {
        //     return res.status(409).json({ 
        //         ok: false, 
        //         msg: 'No se puede eliminar el autor porque tiene libros activos asignados' 
        //         });
        //     }

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
            data: author
        }) 

    } catch (error) {
        next(error)
    }
}



 


