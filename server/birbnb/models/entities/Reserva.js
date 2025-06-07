import { EstadoReserva } from './enums/EstadoReserva.js';
import { FactoryNotificacion } from './FactorYNotificacion.js';

export class Reserva {
  constructor(fechaAlta, huespedReservador, cantidadHuespedes, alojamiento, rangoFechas) {
    this.fechaAlta = fechaAlta;
    this.huespedReservador = huespedReservador;
    this.cantidadHuespedes = cantidadHuespedes;
    this.alojamiento = alojamiento;
    this.rangoFechas = rangoFechas;
    this.estado = EstadoReserva.PENDIENTE;
  }

  notificar() {
    const notificacion = FactoryNotificacion.crearSegunReserva(this);
    const anfitrion = this.alojamiento.anfitrion
    anfitrion.recibirNotificacion(notificacion);
    return anfitrion;
  }

  notificarActualizacion() {
    const notificacion = FactoryNotificacion.crearActualizacion(this);
    this.alojamiento.anfitrion.recibirNotificacion(notificacion);
    return this.alojamiento.anfitrion;
  }

  notificarCambioEstado(nuevoEstado, motivo=null) {
    this.estado = nuevoEstado

    let notificacion = null
    if(nuevoEstado === EstadoReserva.CANCELADA) {

      notificacion = FactoryNotificacion.crearCancelacion(this, motivo)
      this.alojamiento.anfitrion.recibirNotificacion(notificacion)
      return this.alojamiento.anfitrion

    } else if(nuevoEstado === EstadoReserva.CONFIRMADA) {

      notificacion =  FactoryNotificacion.crearConfirmacion(this)
      this.huespedReservador.recibirNotificacion(notificacion)
      return this.huespedReservador

    } else {
      return null
    }
  }
}
