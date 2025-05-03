import { Alojamiento } from "../models/entities/Alojamiento";

export class AlojamientoService {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    findAll() {
        let alojamientos = this.alojamientoService.findAll();
        return alojamientos.map(a => this.toDTO(a));
    }

    findById(id) {
        let alojamiento = this.alojamientoService.findById(id);
        return alojamiento ? this.toDTO(alojamiento) : null;
    }

    findByFilters(filtro) {
        let alojamientos = this.alojamientoService.findByFilters(filtro);
        return alojamientos ? alojamientos.map(a => this.toDTO(a)) : null;
    }

    create(alojamiento) {
        const { anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, reservas, fotos} = alojamiento;
        
        const existente = this.alojamientoService.findByName(nombre);
        if(existente) return null;

        const nuevo = new Alojamiento(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, reservas, fotos);

        this.alojamientoService.save(nuevo);
        return this.toDTO(nuevo);
    }

    delete(id) {
        return this.alojamientoService.deleteById(id);
    }

    toDTO(alojamiento) {
        return {
            id: alojamiento.id,
            anfitrion: alojamiento.anfitrion,
            nombre: alojamiento.nombre,
            descripcion: alojamiento.descripcion,
            precioPorNoche: alojamiento.precioPorNoche,
            moneda: alojamiento.moneda,
            horarioCheckIn: alojamiento.horarioCheckIn,
            horarioCheckOut: alojamiento.horarioCheckOut,
            direccion: alojamiento.direccion,
            cantHuespedesMax: alojamiento.cantHuespedesMax,
            caracteristicas: alojamiento.caracteristicas,
            reservas: alojamiento.reservas,
            fotos: alojamiento.fotos
        }
    }
}