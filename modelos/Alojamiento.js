import { EstadoReserva } from '../enums/EstadoReserva.js';
import { Reserva } from './Reserva.js';

import { FactoryNotificacion } from './FactoryNotificacion.js';

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
    this.reservas = [];
    this.fotos = fotos;
  }

   estasDisponibleEn(rangoFecha) {

    return this.reservas.every(res => res.estado !== EstadoReserva.CONFIRMADA && !res.rangoFechas.seSuperponeCon(rangoFecha));
  } 

  tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
    if(valorMaximo == null) {
      return this.precioPorNoche >= valorMinimo;
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

  reservar(huesped, cantHuespedes, rangoFechas) {
    if (!this.puedenAlojarse(cantHuespedes)) throw new Error("Cantidad de huéspedes supera la capacidad");
    if (!this.estasDisponibleEn(rangoFechas)) throw new Error("El alojamiento no está disponible en las fechas indicadas");
    const reserva = new Reserva(new Date(), huesped, cantHuespedes, this, rangoFechas, this.precioPorNoche);
    this.reservas.push(reserva);
    const notificacion = FactoryNotificacion.crearSegunReserva(reserva);
    this.anfitrion.recibirNotificacion(notificacion);
    return reserva;
  }
}