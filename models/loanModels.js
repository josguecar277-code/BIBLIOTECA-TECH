import { Schema, model } from "mongoose";

const loanSchema = new Schema ({
    user: {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: [true , "El usuario es obligatorio"]

    },
    book: {
        type : Schema.Types.ObjectId,
        ref : "Book",
        required: [true, "El libro es obligatorio"]
    },
    loanDate: {
        type : Date,
        default : Date.now
    },
    dueDate: {
        type : Date,
        required : ["L fecha limite de devolocion es indispensabile"]
    },
    returnDate: {
        type : Date,
        default : null
    },
    status: {
        type : String,
        default : 'ACTIVE',
        enum: ['ACTIVE', 'RETURNED']
    },
    
},
{
    timestamps: true,
    versionKey:false,
})

export default model ("Loan",loanSchema);