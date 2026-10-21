import { Schema, Model, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema ({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minLength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },

    role: {
        type: String,
        enum: {
            values: ['USER', 'ADMIN'],
            message: '{VALUE} no es un rol válido (Debe ser USER o ADMIN)'
        },
        default: 'USER'
    },

    active: {
        type: Boolean,
        required: false,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();

    delete userObject.password;

    return userObject;
}

export default model("User", userSchema);