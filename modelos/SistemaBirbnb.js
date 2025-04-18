import { Usuario } from './modelos/Usuario.js';
import { Alojamiento } from './modelos/Alojamiento.js';
import { RangoFechas } from './modelos/RangoFechas.js';

export class SistemaBirbnb {
  constructor() {
    this.usuarios = [];
    this.alojamientos = [];
  }

  registrarUsuario(nombre, email, tipo) {
    const usuario = new Usuario(nombre, email, tipo);
    this.usuarios.push(usuario);
    return usuario;
  }

  
  agregarAlojamiento(alojamiento) {
    this.alojamientos.push(alojamiento);
  }

  buscarAlojamientos({ ciudad, cantHuespedes, fechaInicio, fechaFin, precioMin, precioMax, caracteristicas = [] }) {
    const rangoFechas = new RangoFechas(fechaInicio, fechaFin);
    return this.alojamientos.filter(a => {
      return (
        a.direccion.ciudad.nombre === ciudad.nombre &&
        a.puedenAlojarse(cantHuespedes) &&
        a.estasDisponibleEn(rangoFechas) &&
        a.tuPrecioEstaDentroDe(precioMin, precioMax) &&
        caracteristicas.every(c => a.tenesCaracteristica(c))
      );
    });
  }
}