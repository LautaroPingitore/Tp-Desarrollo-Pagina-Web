import mongoose from "mongoose";
import { Reserva } from "../entities/Reserva.js";

const reservaSchema = new mongoose.Schema({
    fechaAlta: {
        type: String,
        required: true,
        // DD/MM/YYYY
        length: 10,
        validate: {
            validator: function(v) {
                v.split("/").length == 3 &&
                v[3].length == 4
            },
            message: "Las fechas deben tener formato DD/MM/YYYY"
        },
        trim: true
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
        type: String,
        required: true,
        minlength: 21,
        maxlength: 23,
        validate: {
            validator: function(v) {
                const regex = /^(\d{2})\/(\d{2})\/(\d{4})\s*-\s*(\d{2})\/(\d{2})\/(\d{4})$/;

                if (!regex.test(v)) {
                    return false;
                }

                const matches = v.match(regex);

                const d1 = parseInt(matches[1], 10);
                const m1 = parseInt(matches[2], 10);
                const y1 = parseInt(matches[3], 10);

                const d2 = parseInt(matches[4], 10);
                const m2 = parseInt(matches[5], 10);
                const y2 = parseInt(matches[6], 10);

                const fecha1 = new Date(y1, m1 - 1, d1);
                const fecha2 = new Date(y2, m2 - 1, d2);

                return fecha2 >= fecha1;
            },
            message: props => `${props.value} no es un rango de fechas válido (DD/MM/YYYY - DD/MM/YYYY)`
        },
        trim: true
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