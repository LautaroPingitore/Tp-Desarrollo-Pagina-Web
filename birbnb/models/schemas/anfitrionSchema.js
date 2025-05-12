import mongoose from "mongoose";
import { Anfitrion } from "../entities/Anfitrion.js"

const anfitrionSchema = new mongoose.Schema({
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

anfitrionSchema.loadClass(Anfitrion)

export const AnfitrionModel = mongoose.model("Anfitrion", anfitrionSchema)