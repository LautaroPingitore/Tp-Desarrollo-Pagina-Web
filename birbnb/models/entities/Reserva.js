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
  
  // No tendria que estar aca
  static reservar(alojamiento, huesped, cantHuespedes, rangoFechas) {
    if (!alojamiento.puedenAlojarse(cantHuespedes)) throw new Error("Cantidad de huéspedes supera la capacidad");
    if (!alojamiento.estasDisponibleEn(rangoFechas)) throw new Error("El alojamiento no está disponible en las fechas indicadas");
    const reserva = new Reserva(new Date(), huesped, cantHuespedes, alojamiento, rangoFechas);
    alojamiento.reservas.push(reserva);
    const notificacion = FactoryNotificacion.crearSegunReserva(reserva);
    alojamiento.anfitrion.recibirNotificacion(notificacion);
    return reserva;
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