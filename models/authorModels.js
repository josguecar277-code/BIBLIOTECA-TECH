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
            validator: function(value) {
                if (value === undefined || value === null) return true;
                return Number.isInteger(value) && value >= 0 && value <= new Date().getFullYear();
            },
            message: props => `${props.value} debe ser un entero entre 0 y el año actual`
        }    
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

export default model("Author", authorSchema); //s