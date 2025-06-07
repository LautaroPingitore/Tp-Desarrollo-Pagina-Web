import { EstadoReserva } from "./enums/EstadoReserva.js"
import { Usuario } from "./Usuario.js"

export class Huesped extends Usuario {
    modificarReserva(reserva, nuevaCantidad, nuevaFechas) {
        const notificacion = reserva.actualizarReserva(nuevaCantidad, nuevaFechas)
        this.recibirNotificacion(notificacion)
    }

    cancelarReserva(reserva, motivo) {
        const notificacion = reserva.actualizarEstado(EstadoReserva.CANCELADA, motivo)
        this.recibirNotificacion(notificacion)
    }
}