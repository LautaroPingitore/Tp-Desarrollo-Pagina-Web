import { EstadoReserva } from './enums/EstadoReserva.js';
import { TipoUsuario } from './enums/TipoUsuario.js';

export class Usuario {
  #id

  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.notificaciones = [];
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  recibirNotificacion(notificacion) {
    this.notificaciones.push(notificacion);
  }
}