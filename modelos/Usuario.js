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

  cambiarEstado(reserva) {
    
  }
}
  