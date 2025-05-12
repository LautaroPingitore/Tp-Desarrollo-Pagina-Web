import { EstadoReserva } from './enums/EstadoReserva.js';
import { Reserva } from './Reserva.js';
import { FactoryNotificacion } from './FactorYNotificacion.js';

export class Alojamiento {
  #id

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

  set id(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  estasDisponibleEn(rangoFecha) {
    return this.reservas.every(res => res.estado !== EstadoReserva.CONFIRMADA && !res.rangoFechas.seSuperponeCon(rangoFecha));
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

  // No tendria que estar aca
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