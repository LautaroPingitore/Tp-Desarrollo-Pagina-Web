export class Notificacion {
  constructor(mensaje, usuario) {
    this.mensaje = mensaje;
    // No deberia estar el atributo Usuario
    this.usuario = usuario;
    this.fechaAlta = new Date();
    this.leida = false;
    this.fechaLeida = null;
  }

  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }
}