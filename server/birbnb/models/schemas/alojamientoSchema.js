import mongoose, { Schema } from "mongoose"
import { Alojamiento } from "../entities/Alojamiento.js";

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Anfitrion", 
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
        trim: true,
        enum: ["DOLAR_USA", "PESO_ARG", "REALES"]
    },
       
    
    horarioCheckIn: {
        type: String,
        required: true,
        trim: true,
        length: 5,
        validate: {
            validator: function(v) {
                v.split(":").length == 2
            }
        } 
    },
    
    horarioCheckOut: {
        type: String,
        required: true,
        trim: true,
        length: 5,
        validate: {
            validator: function(v) {
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
            type: Schema.Types.Mixed,
            required: true,
            validate: {
                validator: function (v) {
                return typeof v === 'string' || typeof v === 'number';
                },
                message: props => `${props.value} no es ni un string ni un número válido para altura`
            }
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
        enum: ["PISCINA", "WIFI", "MASCOTAS_PERMITIDAS", "ESTACIONAMIENTO"]
    }],

    fotos: [{
        type: String,
        required: true,
        trim: true,
        minlength: 1,   
        maxlength: 1000
    }],

    fechasNoDisponibles: [{
        fechaInicio: {
            type: Date,
            required: true
        },

        fechaFin: {
            type: Date,
            required: true
        }
    }]
})

alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model("Alojamiento", alojamientoSchema);
