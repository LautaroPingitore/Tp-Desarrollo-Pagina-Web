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