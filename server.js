import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./database/config.js";
import { logger } from "./middlewares/loggers.js";
import { notFound, errorHandler } from "./middlewares/errores.js";
import authRouter from "./routes/authRouter.js";
import authorsRouter from "./routes/authorsRouter.js";
import bookRouter from "./routes/bookRouter.js";
import loanRouter from "./routes/loanRouter.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    
    this.middlewares();
    this.routes();
    this.errores();
    // this.conectarBaseDatos();
  }

  async conectarBaseDatos() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.json());    //
    this.app.use(cors());
    this.app.use(logger);
  }

  routes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/authors", authorsRouter);
    this.app.use("/api/books", bookRouter);
    this.app.use("/api/loans", loanRouter);
  }

  errores() {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
