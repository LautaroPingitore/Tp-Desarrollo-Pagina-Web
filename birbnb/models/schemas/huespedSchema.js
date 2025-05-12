import mongoose from "mongoose";
import { Huesped } from "../entities/Huesped.js";

const huespedSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,   
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v); 
            },
            message: props => `${props.value} no es un email valido!`
        }
    }
})

huespedSchema.loadClass(Huesped)

export const HuespedModel = mongoose.model("Huesped", huespedSchema)
