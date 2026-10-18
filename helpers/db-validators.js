 import Book from "../models/book.models.js";

export const isbnExiste = async (isbn = "") => {
  const libro = await Book.findOne({ isbn });
  if (libro) {
    throw new Error("El ISBN ya está registrado");
  }
};