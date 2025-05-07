import { EstadoReserva } from "./enums/EstadoReserva.js"
import { Usuario } from "./Usuario.js"

export class Huesped extends Usuario {
    cancelarReserva(reserva, motivo) {
        reserva.actualizarEstado(EstadoReserva.CANCELADA, motivo)
    }
}