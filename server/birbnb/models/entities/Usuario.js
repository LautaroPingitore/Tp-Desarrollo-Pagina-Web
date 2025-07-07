export class Usuario {
  constructor(nombre, apellido , email, contrasenia) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.contrasenia = contrasenia;
    this.notificaciones = [];
  }

  recibirNotificacion(notificacion) {
    this.notificaciones.push(notificacion);
  }
}