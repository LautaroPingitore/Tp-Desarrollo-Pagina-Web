import mongoose from "mongoose"
import { Alojamiento } from "../entities/Alojamiento.js";


const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario", 
        required: true
    },
    
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,   
        maxlength: 100
    },
    
    descripcion: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,   
        maxlength: 1000
    },

    precioPorNoche: {
        type: Number,
        required: true,
        min: 0
    },

    moneda: {
        type: String,
        required: true,
        enum: ["DOLAR_USA", "PESO_ARG", "REALES"]
    },
       
    
    horarioCheckIn: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                v.length == 5 &&
                v.split(":").length == 2
            }
        } 
    },
    
    horarioCheckOut: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                v.length == 5 &&
                v.split(":").length == 2
            }
        } 
    },

    direccion: {
        calle: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,   
            maxlength: 100
        },
        altura: {
            type: Number,
            required: true,
            min: 0
        },
        ciudad: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ciudad", 
            required: true
        }
    },

    cantHuespedesMax: {
        type: Number,
        required: true,
        min: 1
    },

    caracteristicas: [{
        type: String,
        required: true,
        enum: ["pileta", "wifi", "parrilla", "cocina", "aire acondicionado"]
    }],

    fotos: [{
        type: String,
        required: true,
        trim: true,
        minlength: 1,   
        maxlength: 1000
    }]
})

alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model("Alojamiento", alojamientoSchema);
