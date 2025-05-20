import { RangoFechas } from "./RangoFechas.js";

export class Filtro {
    constructor(ciudad=null, pais=null, cantHuespedes=null, fechaInicio=null, fechaFin=null, precioMin=null, precioMax=null, caracteristicas=[]) {
        this.ciudad = ciudad;
        this.pais = pais;
        this.cantHuespedes = cantHuespedes;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.precioMin = precioMin;
        this.precioMax = precioMax;
        this.caracteristicas = caracteristicas;
    }

    validarCiudad(alojamiento, ciudad) {
        if(ciudad == null) return true;
        return alojamiento.direccion.ciudad.nombre == ciudad.nombre;
    }

    validarPais(alojamiento, pais) {
        if(pais == null) return true;
        return alojamiento.direccion.ciudad.pais = pais;
    }

    validarCantidadHuespedes(alojamiento, cantidadHuespedes) {
        if(cantidadHuespedes == null) return true;
        return alojamiento.puedenAlojarse(cantidadHuespedes);
    }

    validarFechas(alojamiento, fechaInicio, fechaFin) {
        if(fechaInicio == null) return true;
        if(fechaFin == null) {
            fechaFin = new Date();
        }
        const rangoFechas = new RangoFechas(fechaInicio, fechaFin)
        return alojamiento.estasDisponibleEn(rangoFechas);
    }

    validarPrecio(alojamiento, precioMin, precioMax) {
        if(precioMax == null) return true;
        return alojamiento.tuPrecioEstaDentroDe(precioMin, precioMax);
    }

    validarCaracteristicas(alojamiento, caracteristicas) {
        if(caracteristicas == null) return true;
        return caracteristicas.every(c => alojamiento.tenesCaracteristica(c));
    }

    cumplenCon(alojamientos) {
        return alojamientos.filter(a => {
            return (
              this.validarCiudad(a, this.ciudad) &&
              this.validarPais(a, this.pais) &&
              this.validarCantidadHuespedes(a, this.cantHuespedes) &&
              this.validarFechas(a, this.fechaInicio, this.fechaFin) &&
              this.validarPrecio(a, this.precioMin, this.precioMax) &&
              this.validarCaracteristicas(a, this.caracteristicas)
            );
        });
    }
}