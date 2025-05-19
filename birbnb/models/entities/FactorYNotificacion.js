import { Notificacion } from './Notificacion.js';

export class FactoryNotificacion {
  static crearSegunReserva(reserva, motivo = null) {
    const alojamiento = reserva.alojamiento;
    const huesped = reserva.huespedReservador;
    const mensaje = `Reserva realizada por ${huesped.nombre} del ${reserva.rangoFechas.fechaInicio.toDateString()} al ${reserva.rangoFechas.fechaFin.toDateString()} en ${alojamiento.nombre}`;
    return new Notificacion(mensaje);
  }

  static crearConfirmacion(reserva) {
    const mensaje = `Tu reserva en ${reserva.alojamiento.nombre} ha sido confirmada por el anfitrión.`;
    return new Notificacion(mensaje);
  }

  static crearCancelacion(reserva, motivo) {
    if(motivo == null) {
      motivo = "Sin Especificar";
    }
    const mensaje = `El huésped ${reserva.huespedReservador.nombre} canceló su reserva en ${reserva.alojamiento.nombre}. Motivo: ${motivo}`;
    return new Notificacion(mensaje);
  }

  static crearActualizacion(reserva) {
    const mensaje = `Tu reserva en ${reserva.alojamiento.nombre} a sido modificada`
    return new Notificacion(mensaje)
  }
}