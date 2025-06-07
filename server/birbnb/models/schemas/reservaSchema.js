import mongoose from "mongoose";
import { Reserva } from "../entities/Reserva.js";

const reservaSchema = new mongoose.Schema({
    fechaAlta: {
        type: Date,
        required: true,
    },

    huespedReservador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Huesped",
        required: true
    },

    cantidadHuespedes: {
        type: Number,
        min: 1,
        required: true
    },

    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alojamiento",
        required: true
    },

    rangoFechas: {
        fechaInicio: {
            type: Date,
            required: true
        },

        fechaFin: {
            type: Date,
            required: true
        }
    },

    estado: {
        type: String,
        required: true,
        trim: true,
        enum: ["PENDIENTE", "CONFIRMADA", "CANCELADA"]
    }
})

reservaSchema.loadClass(Reserva)

export const ReservaModel = mongoose.model("Reserva", reservaSchema)