import { EstadoReserva } from './enums/EstadoReserva.js';
import { FactoryNotificacion } from './FactorYNotificacion.js';

export class Reserva {
  constructor(fechaAlta, huespedReservador, cantHuespedes, alojamiento, rangoFechas) {
    this.fechaAlta = fechaAlta;
    this.huespedReservador = huespedReservador;
    this.cantHuespedes = cantHuespedes;
    this.alojamiento = alojamiento;
    this.rangoFechas = rangoFechas;
    this.estado = EstadoReserva.PENDIENTE;
  }

  notificar(alojamiento) {
    const notificacion = FactoryNotificacion.crearSegunReserva(reserva);
    alojamiento.anfitrion.recibirNotificacion(notificacion);
    return alojamiento.anfitrion;
  }

  notificarActualizacion(alojamiento) {
  }

  actualizarEstado(nuevoEstado, motivo=null) {
    this.estado = nuevoEstado;

    if(nuevoEstado == EstadoReserva.CANCELADA) {
      return FactoryNotificacion.crearCancelacion(this, motivo)
    } else if(nuevoEstado == EstadoReserva.CONFIRMADA) {
      return FactoryNotificacion.crearConfirmacion(this)
    }
  }
}