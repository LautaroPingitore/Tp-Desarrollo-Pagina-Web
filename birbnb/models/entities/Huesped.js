import { Usuario } from "./Usuario.js"
import { EstadoReserva } from "../enums/EstadoReserva.js";

export class Huesped extends Usuario {
    cancelarReserva(reserva, motivo) {
        reserva.actualizarEstado(EstadoReserva.CANCELADA, motivo)
    }
}