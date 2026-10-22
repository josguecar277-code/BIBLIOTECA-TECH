import Loan from "../models/loanModels.js";
import Book from "../models/bookModels.js";

export const createLoan = async (req, res, next) => {
  try {
    const bookId = req.body.book;
    const userId = req.user._id;

    const existe = await Book.findOne({ _id: bookId, active: true });
    if (!existe) {
      return res.status(404).json({ 
        ok: false,
         msg: "Libro no encontrado"
         });
    }
 
    // R3:
    const repetido = await Loan.findOne({ user: userId, book: bookId, status: "ACTIVE" });
    if (repetido) {
      return res.status(409).json({ 
        ok: false,
         msg: "Ya tienes este libro prestado"
         });
    }

    // R2: máximo 3 préstamos activos
    const activos = await Loan.countDocuments({ user: userId, status: "ACTIVE" });
    if (activos >= 3) {
      return res.status(409).json({ 
        ok:false, 
         msg: "Límite de préstamos alcanzado" });
    }

    // R1 y R4:
    const book = await Book.findOneAndUpdate(
      { _id: bookId, active: true, availableCopies: { $gt: 0 } },
      { $inc: { availableCopies: -1 } },
      { returnDocument: "after" }
    );
    if (!book) {
      return res.status(409).json({ 
        ok: false,
         msg: "No hay copias disponibles" 
        });
    }

    const loanDate = new Date();
    const dueDate = new Date(loanDate.getTime() + 14 * 24 * 60 * 60 * 1000);

    let loan;
    try {
      loan = await Loan.create({ user: userId, book: bookId, loanDate, dueDate });
    } catch (error) {
      // si falla crear el préstamo, devuelve la copia
      await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: 1 } });
      throw error;
    }

    res.status(201).json({ 
        ok: true, 
        data: loan });
  } catch (error) {
    next(error);
  }
};

export const getMyLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({ user: req.user._id }).populate("book");
    res.status(200).json({
         ok: true,
          data: loans });
  } catch (error) {
    next(error);
  }
};

export const returnLoan = async (req, res, next) => {
  try {
    const id = req.params.id;

    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({
         ok: false, 
         msg: "Préstamo no encontrado"
         });
    }

    // R7
    const esDueno = loan.user.toString() === req.user._id.toString();
    if (!esDueno && req.user.role !== "ADMIN") {
      return res.status(403).json({
         ok: false, 
         msg: "No tienes permiso"
         });
    }

    // R6
    const devuelto = await Loan.findOneAndUpdate(
      { _id: id, status: "ACTIVE" },
      { status: "RETURNED", returnDate: new Date() },
      { returnDocument: "after" }
    );
    if (!devuelto) {
      return res.status(400).json({ 
        ok: false,
         msg: "El préstamo ya fue devuelto" });
    }

    // R4: 
    await Book.findByIdAndUpdate(loan.book, { $inc: { availableCopies: 1 } });

    res.status(200).json({ 
        ok: true,
         data: devuelto 
        });
  } catch (error) {
    next(error);
  }
};

export const getLoans = async (req, res, next) => {
  try {
    const filtro = {};
    if (req.query.status) filtro.status = req.query.status;

    const loans = await Loan.find(filtro)
      .populate("user", "name email")
      .populate("book", "title");
    res.status(200).json({
         ok: true, 
         data: loans });
  } catch (error) {
    next(error);
  }
};

export const getOverdueLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({ status: "ACTIVE", dueDate: { $lt: new Date() } })
      .populate("user", "name email")
      .populate("book", "title");
    res.status(200).json({ ok: true,
         data: 
         loans });
  } catch (error) {
    next(error);
  }
};