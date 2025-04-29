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
    this.cambiosEstado = [];
  }

  // Verificar bien esto
  actualizarEstado({nuevoEstado, motivo}) {
    this.estado = nuevoEstado;
    const cambio = new CambioEstadoReserva(new Date(), nuevoEstado, this, motivo, this.huespedReservador);
    
    this.cambiosEstado.push(cambio);
    this.alojamiento.anfitrion.recibirNotificacion(FactoryNotificacion.crearCancelacion(this, motivo));    
  }
}