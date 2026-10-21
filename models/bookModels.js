import {Schema, model} from "mongoose";

const  bookSchema = new Schema ({
    title: {
        type : String,
        required : [true, "El titulo es obligatorio"],
        trim : true,
        maxlength: [120, "maximo 120 caracteres"],
    },
    isbn:{ 
        type: String,
        required : [true,"El ISBN es obligatorio"],
        unique: true,
        match: [/^(\d{10}|\d{13})$/, "El ISBN debe tener 10 o 13 dígitos"],
    },
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'Author',
        required : [true, "El autor es obligatorio"]
    },
    genre :{
        type: String,
        enum: {
        values: ["novela","cuento","poesia","ensayo","tecnologia","historia","infantil"]
    },
    },
    year:{
        type: Number,
        max: [new Date().getFullYear(), "El año no puede ser mayor al actual"],
        validate :{
            validator: Number.isInteger,
            message: "El año debe ser un numero entero",
      },
    }, 
    totalCopies: {
        type: Number,
        required: true,
        validate : {
            validator: Number.isInteger,
        },
        min: 1,
    },
    availableCopies: {
        type:Number,
        validate: {
            validator: Number.isInteger,
            message: "Debe ser un numero entero",
        },
        min:0,

    },
    active: {
        type: Boolean,
        default:true,

    },
},
{
    timestamps: true,
     versionKey:false,
    
})


export default model ("Book", bookSchema);