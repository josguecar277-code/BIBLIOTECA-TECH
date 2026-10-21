import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./database/config.js";
import { logger } from "./middlewares/loggers.js";
import { notFound, errorHandler } from "./middlewares/errores.js";
import authRouter from "./routes/authRouter.js";
import authorsRouter from "./routes/authorsRouter.js";
import bookRouter from "./routes/bookRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
    this.errores();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger);
  }

  routes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/authors", authorsRouter);
    this.app.use("/api/books", bookRouter);
    this.app.use("/api/loans", loanRoutes);
  }

  errores() {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  async listen() {
    await dbConnection();
    this.app.listen(this.port, () => {
      console.log("Escuchando en el puerto " + this.port);
    });
  }
}

export default Server;