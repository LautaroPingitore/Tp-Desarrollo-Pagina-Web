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
  }

  estasDisponibleEn(reservas, rangoFecha) {
    return reservas.every(res => res.estado !== EstadoReserva.CONFIRMADA && !res.rangoFechas.seSuperponeCon(rangoFecha));
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