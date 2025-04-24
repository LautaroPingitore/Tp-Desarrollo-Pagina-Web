import { Usuario } from './modelos/Usuario.js';
import { Alojamiento } from './modelos/Alojamiento.js';
import { RangoFechas } from './modelos/RangoFechas.js';
import { Caracteristica } from '../enums/Caracteristica.js';

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

  validarCiudad(alojamiento, ciudad) {
    return alojamiento.direccion.ciudad.nombre == ciudad.nombre || ciudad == null;
  }

  validarCantidadHuespedes(alojamiento, cantidadHuespedes) {
    return alojamiento.puedenAlojarse(cantidadHuespedes) || cantidadHuespedes == null;
  }

  validarFechas(alojamiento, fechaInicio, fechaFin) {
    if(fechaFin == null) {
      fechaFin = new Date();
    }
    const rangoFechas = new RangoFechas(fechaInicio, fechaFin)
    return alojamiento.estasDisponibleEn(rangoFechas) || fechaInicio == null;
  }

  validarPrecio(alojamiento, precioMin, precioMax) {
    return alojamiento.tuPrecioEstaDentroDe(precioMin, precioMax) || precioMin == null;
  }

  validarCaracteristicas(alojamiento, caracteristicas) {
    return caracteristicas.every(c => alojamiento.tenesCaracteristica(c)) || caracteristicas == null;
  }

  buscarAlojamientos({ ciudad, cantHuespedes, fechaInicio, fechaFin, precioMin, precioMax, caracteristicas = [] }) {
    return this.alojamientos.filter(a => {
      return (
        this.validarCiudad(a, ciudad) &&
        this.validarCantidadHuespedes(a, cantHuespedes) &&
        this.validarFechas(a, fechaInicio, fechaFin) &&
        this.validarPrecio(a, precioMin, precioMax) &&
        this.validarCaracteristicas(a, Caracteristicas)
      );
    });
  }
}