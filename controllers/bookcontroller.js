import Book from "../models/bookModels.js";
import Loan from "../models/loanModels.js";

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

    const actual = await Book.findById(id);
    if (!actual) {
      return res.status(404).json({
         ok: false,
         msg: "Libro no encontrado" });
    }

    // R5: totalCopies no puede ser menor a las copias prestadas //
    const prestadas = actual.totalCopies - actual.availableCopies;
    if (totalCopies < prestadas) {
      return res.status(400).json({
        ok: false,
        msg: "totalCopies no puede ser menor a las copias prestadas" });
    }

    const cambios = { title, isbn, author, genre, year, totalCopies, availableCopies: totalCopies - prestadas };
    for (const k of Object.keys(cambios)) if (cambios[k] === undefined) delete cambios[k];

    const book = await Book.findByIdAndUpdate(
      id,
      cambios,
      { returnDocument: "after", runValidators: true }
    );

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

    const prestamos = await Loan.countDocuments({ book: id, status: "ACTIVE" });
    if (prestamos > 0) {
      return res.status(409).json({
        ok: false,
        msg: "El libro tiene préstamos activos" });
        
    }
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