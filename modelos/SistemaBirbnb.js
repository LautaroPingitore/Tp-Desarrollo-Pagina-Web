import { Usuario } from './Usuario.js';
import { RangoFechas } from './RangoFechas.js';

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

  /* validarCiudad(alojamiento, ciudad) {
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
  } */


  //////// VERSION 2 //////////

  buscarAlojamientosV2( ciudad, cantHuespedes, fechaInicio, fechaFin, precioMin, precioMax, caracteristicas) {
    let alojamientosFiltrados = this.alojamientos;

    if (ciudad !== null) {
        alojamientosFiltrados = this.filtrarPorCiudad(alojamientosFiltrados, ciudad);
    }
    if (cantHuespedes !== null) {
        alojamientosFiltrados = this.filtrarPorCantidadHuespedes(alojamientosFiltrados, cantHuespedes);
    }
    if (fechaInicio !== null && fechaFin !== null) {
        alojamientosFiltrados = this.filtrarPorFechas(alojamientosFiltrados, fechaInicio, fechaFin);
    }
    if (precioMin !== null && precioMax !== null) {
        alojamientosFiltrados = this.filtrarPorPrecio(alojamientosFiltrados, precioMin, precioMax);
    }
    if (caracteristicas.length > 0) {
        alojamientosFiltrados = this.filtrarPorCaracteristicas(alojamientosFiltrados, caracteristicas);
    }

    return alojamientosFiltrados;
}

filtrarPorCiudad(alojamientos, ciudad) {
    return alojamientos.filter(a => a.direccion.ciudad.nombre === ciudad.nombre);
}

filtrarPorCantidadHuespedes(alojamientos, cantHuespedes) {
    return alojamientos.filter(a => a.puedenAlojarse(cantHuespedes));
}

filtrarPorFechas(alojamientos, fechaInicio, fechaFin) {
    const rangoFechas = new RangoFechas(fechaInicio, fechaFin);
    return alojamientos.filter(a => a.estasDisponibleEn(rangoFechas));
}

filtrarPorPrecio(alojamientos, precioMin, precioMax) {
    return alojamientos.filter(a => a.tuPrecioEstaDentroDe(precioMin, precioMax));
}

filtrarPorCaracteristicas(alojamientos, caracteristicas) {
    return alojamientos.filter(a => caracteristicas.every(c => a.tenesCaracteristica(c)));
}
}