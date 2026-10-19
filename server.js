
import express from "express"
import { dbConnection } from "./database/config.js";

// import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import  bookRouter from "./routes/book.routes.js"


class Server {
    app
    port
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.middlewares()
        this.routes()
        this.conectionDB()
    }

    middlewares() {
        this.app.use(express.json())
        console.log(process.loadEnvFile.PORT)
    }


    routes() {
        this.app.use("/api/books", bookRouter)


    }

         
    async conectionDB (){
        await dbConnection ();
    //       this.app.listen(this.port, () => {
    //     console.log(`Servidor corriendo en puerto ${this.port}`);
    // });
    }
    
    
   
    listen() {
        this.app.listen(this.port, () => {
            console.log("Listen port " + this.port)
        })
    }
}

new Server().listen()
    