import mongoose from "mongoose"
import { Ciudad } from "../entities/Ciudad.js"

const ciudadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,   
        maxlength: 100
    },

    pais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pais",
        required: true
    }
})

ciudadSchema.loadClass(Ciudad)

export const CiudadModel = mongoose.model("Ciudad", ciudadSchema)