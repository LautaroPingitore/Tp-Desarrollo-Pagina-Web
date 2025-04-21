import { EstadoReserva } from '../enums/EstadoReserva.js';
import { TipoUsuario } from '../enums/TipoUsuario.js';

export class Usuario {
  constructor(nombre, email, tipo) {
    this.nombre = nombre;
    this.email = email;
    this.tipo = tipo; // Huesped o Anfitrion
    this.notificaciones = [];
  }

  recibirNotificacion(notificacion) {
    this.notificaciones.push(notificacion);
  }

  aceptarReserva(reserva){
    if(this.tipo == TipoUsuario.ANFITRION) {
      reserva.actualizarEstado(EstadoReserva.CONFIRMADA);
    }
  }
  
  // Recibir un motivo
  cancelarReserva(reserva, motivo) {
    if(this.tipo == TipoUsuario.HUESPED) {
      reserva.actualizarEstado(EstadoReserva.CANCELADA, motivo)
    }
  }
}