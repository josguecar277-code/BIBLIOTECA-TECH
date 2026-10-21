import Book from "../models/bookModels.js";
import Author from "../models/authorModels.js";

export const isbnExiste = async (isbn = "", id = null) => {
  const filtro = { isbn };
  if (id) filtro._id = { $ne: id };
  const libro = await Book.findOne(filtro);
  if (libro) throw new Error("El ISBN ya está registrado");
};

export const existeAutorPorId = async (id) => {
  const author = await Author.findOne({ _id: id, active: true });
  if (!author) throw new Error(`No existe un autor activo con el id ${id}`);
};








































































//  import Book from "../models/bookModels.js";

// export const isbnExiste = async (isbn = "") => {
//   const libro = await Book.findOne({ isbn });
//   if (libro) {
//     throw new Error("El ISBN ya está registrado");
//   }
// };