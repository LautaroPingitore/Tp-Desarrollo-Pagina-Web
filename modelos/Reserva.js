import { EstadoReserva } from '../enums/EstadoReserva.js';
import { CambioEstadoReserva } from './CambioEstadoReserva.js';
import { FactoryNotificacion } from './FactoryNotificacion.js';

export class Reserva {
  constructor(fechaAlta, huespedReservador, cantHuespedes, alojamiento, rangoFechas, precioPorNoche) {
    this.fechaAlta = fechaAlta;
    this.huespedReservador = huespedReservador;
    this.cantHuespedes = cantHuespedes;
    this.alojamiento = alojamiento;
    this.rangoFechas = rangoFechas;
    this.estado = EstadoReserva.PENDIENTE;
    this.precioPorNoche = precioPorNoche;
    // this.cambiosEstado = [];
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
    // const cambio = new CambioEstadoReserva(new Date(), nuevoEstado, this, motivo, usuario);
    // this.cambiosEstado.push(cambio);

    if (nuevoEstado === EstadoReserva.CONFIRMADA) {
      this.huespedReservador.recibirNotificacion(FactoryNotificacion.crearConfirmacion(this));
    } else if (nuevoEstado === EstadoReserva.CANCELADA) {
      this.alojamiento.anfitrion.recibirNotificacion(FactoryNotificacion.crearCancelacion(this, motivo));
    }
    
  }
}
