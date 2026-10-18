import { model, Schema } from "mongoose";

const authorSchema = new Schema ({
    name : {
        type : string,
        required : true,
        unique: true
    },
    nationaly: {
        type: string,
        required: false
    },
    birthyYear: {
        type: Number,
        required: false, 
        validate: {
            validator: value => value <= new Date().getFullYear(),
            message: 'El año de nacimiento np puede ser mayor que el año actual.',
        },  
     }, 
     active: {
        type: Boolean,
        required: false,
        default: true,
     },
    }, {
        timestamp: true,
})


 
export default model ("Author", authorSchema); 