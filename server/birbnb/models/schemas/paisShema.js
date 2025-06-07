import mongoose from "mongoose";
import { Pais } from "../entities/Pais.js"

const paisSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }
})

paisSchema.loadClass(Pais)

export const PaisModel = mongoose.model("Pais", paisSchema)