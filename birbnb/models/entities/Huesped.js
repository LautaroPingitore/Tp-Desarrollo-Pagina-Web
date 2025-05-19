import { EstadoReserva } from "./enums/EstadoReserva.js"
import { Usuario } from "./Usuario.js"

export class Huesped extends Usuario {
    modificarReserva(reserva, nuevaCantidad, nuevaFechas) {
        const notificacion = reserva.actualizarReserva(nuevaCantidad, nuevaFechas)
        notificacion.nro = this.notificaciones.length + 1
        this.recibirNotificacion(notificacion)
    }

    cancelarReserva(reserva, motivo) {
        const notificacion = reserva.actualizarEstado(EstadoReserva.CANCELADA, motivo)
        notificacion.nro = this.notificaciones.length + 1
        this.recibirNotificacion(notificacion)
    }
}