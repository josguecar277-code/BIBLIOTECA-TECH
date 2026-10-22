
import Authors from "../models/authorModels.js";
import Books from "../models/bookModels.js";

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


        res.status(201).json({
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
        const { id } = req.params;

        if(!author) {
            res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
            return
        }
                // un autor y la lista de sus libros
        const books = await Books.find({ author: id, active: true });

        res.status(200).json({
            // msg: (author),
            ok: true,
            data: { author, books }
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
        
        const libros = await Book.countDocuments({ author: id, active: true })
        if (libros > 0) {
            return res.status(409).json({
                ok: false,
                msg: "El autor tiene libros activos"
            })
        }

        // borrado lógico
        const author = await Authors.findByIdAndUpdate(
            id,
            { active: false },
            { returnDocument: "after" }
        );

        if(!author) {
            return res.status(404).json({
                ok: false,
                msg: "Autor no encontrado"
            })
        }

        res.status(200).json({
            ok: true,
            data: author
        }) 

    } catch (error) {
        next(error)
    }
}



 


