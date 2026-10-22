import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect (process.env.MONGO_URL);
        console.log("Conexión exitosa a MongoDB");
    }catch (error){
        console.log (error);
        throw new Error ("Error al iniciar la base de datos")
    }
};



