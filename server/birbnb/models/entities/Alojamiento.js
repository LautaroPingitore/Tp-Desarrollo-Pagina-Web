import { EstadoReserva } from './enums/EstadoReserva.js';

export class Alojamiento {
  constructor(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, fotos) {
    this.anfitrion = anfitrion;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPorNoche = precioPorNoche;
    this.moneda = moneda;
    this.horarioCheckIn = horarioCheckIn;
    this.horarioCheckOut = horarioCheckOut;
    this.direccion = direccion;
    this.cantHuespedesMax = cantHuespedesMax;
    this.caracteristicas = caracteristicas;
    this.fotos = fotos;
    this.fechasNoDisponibles = []
  }

  agregarFechasReserva(rangoFecha) {
    this.fechasNoDisponibles.push(rangoFecha)
  }

  eliminarFechasReserva(rangoFecha) {
    const index = this.fechasNoDisponibles.findIndex(r => 
      r.fechaInicio.getTime() === rangoFecha.fechaInicio.getTime() && 
      r.fechaFin.getTime() === rangoFecha.fechaFin.getTime()
    );

    if (index !== -1) {
      this.fechasNoDisponibles.splice(index, 1);
    }
  }

  estasDisponibleEn(rangoFecha) {
    return this.fechasNoDisponibles.every(f => !f.seSuperponeCon(rangoFecha))
  } 

  tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
    if(valorMinimo == null) {
      return this.precioPorNoche <= valorMaximo;
    } else {
      return this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo;
    }
  }

  tenesCaracteristica(caracteristica) {
    return this.caracteristicas.includes(caracteristica);
  }

  puedenAlojarse(cantHuespedes) {
    return cantHuespedes <= this.cantHuespedesMax;
  }
}