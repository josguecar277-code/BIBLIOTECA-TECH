import { Schema, model } from "mongoose";

const authorSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    nationality: {
        type: String,
        required: false,
    },
    birthYear: {
        type: Number,
        required: false,
        validate: {
            validator: value => value => new Date().getFullYear,
            message: 'El año de nacimiento no puede ser mayor que el año actual.',
        },    
    },
        active: {
        type: Boolean,
        required: false,
        default: true,
    },
},  {
    timestamps: true,
    versionKey: false
});

export default model("Authors", authorSchema);