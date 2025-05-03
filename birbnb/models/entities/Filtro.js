export class Filtro {
    constructor(ciudad=null, cantHuespedes=null, fechaInicio=null, fechaFin=null, precioMin=null, precioMax=null, caracteristicas=null) {
        this.ciudad = ciudad;
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
        if(precioMin == null) return true;
        return alojamiento.tuPrecioEstaDentroDe(precioMin, precioMax);
    }

    validarCaracteristicas(alojamiento, caracteristicas) {
        if(caracteristicas == null) return true;
        return caracteristicas.every(c => alojamiento.tenesCaracteristica(c));
    }

    cumplenCon(alojamientos) {
        return this.alojamientos.filter(a => {
            return (
              this.validarCiudad(a, ciudad) &&
              this.validarCantidadHuespedes(a, cantHuespedes) &&
              this.validarFechas(a, fechaInicio, fechaFin) &&
              this.validarPrecio(a, precioMin, precioMax) &&
              this.validarCaracteristicas(a, caracteristicas)
            );
        });
    }
}