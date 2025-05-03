import { Usuario } from "./Usuario.js";
import { EstadoReserva } from "./enums/EstadoReserva.js";
import { FactoryNotificacion } from "./FactorYNotificacion.js";

export class Anfitrion extends Usuario {
    aceptarReserva(reserva, motivo = null) {
        reserva.actualizarEstado(EstadoReserva.CONFIRMADA, motivo);
    }
}