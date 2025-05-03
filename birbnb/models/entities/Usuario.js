import { EstadoReserva } from './enums/EstadoReserva.js';
import { TipoUsuario } from './enums/TipoUsuario.js';

export class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.notificaciones = [];
  }

  recibirNotificacion(notificacion) {
    this.notificaciones.push(notificacion);
  }
}