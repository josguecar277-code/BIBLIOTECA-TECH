import Book from "../models/book.models.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ 
        active: true }).populate("author", "name");
    res.status(200).json({ 
        ok: true, 
        data: books });
  } catch (error) {
    next(error);
  }
};

export const availableBooks = async (req, res, next) => {
  try {
    const books = await Book.find({
         active: true,
          availableCopies: { $gt: 0 } })
      .populate("author", "name");
    res.status(200).json({ 
        ok: true, 
        data: books });
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id).populate("author");

    if (!book) {
      return res.status(404).json({ 
        ok: false, 
        msg: "Libro no encontrado" });
    }
    res.status(200).json({
         ok: true, 
         data: book });
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const { title, isbn, author, genre, year, totalCopies } = req.body;

    const book = await Book.create({
      title,
      isbn,
      author,
      genre,
      year,
      totalCopies,
      availableCopies: totalCopies,
    });

    res.status(201).json({
         ok: true,
          data: book });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, isbn, author, genre, year, totalCopies } = req.body;

    const book = await Book.findByIdAndUpdate(
      id,
      { title, isbn, author, genre, year, totalCopies },
      { returnDocument: "after", runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
         ok: false, 
         msg: "Libro no encontrado" });
    }
    res.status(200).json({
         ok: true, 
         data: book });
  } catch (error) {
    next(error);
  }
};

export const deletebook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate(
      id,
      { active: false },
      { returnDocument: "after" }
    );

    if (!book) {
      return res.status(404).json({ 
        ok: false,
         msg: "Libro no encontrado" });
    }
    res.status(200).json({ 
        ok: true,
         data: book });
  } catch (error) {
    next(error);
  }
};