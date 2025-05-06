import { Alojamiento } from "../models/entities/Alojamiento.js";

export class AlojamientoService {
    constructor(alojamientoRepository, anfitrionRepository) {
        this.alojamientoRepository = alojamientoRepository
        this.anfitrionRepository = anfitrionRepository
    }

    findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let alojamientos = this.alojamientoRepository.findByPage(pageNum, limit)

        const total = this.alojamientoRepository.coutAll()
        const totla_pages = Math.ceil(total / limitNum)
        const data = alojamientos.map(a => this.toDTO(a))

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            totla_pages: totla_pages,
            data: data
        };
    }

    findById(id) {
        let alojamiento = this.alojamientoRepository.findById(id)
        return alojamiento ? this.toDTO(alojamiento) : null
    }

    findByFilters(filtro,{page=1,limit=10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let alojamientos = this.alojamientoRepository.findByFilters(filtro, {pageNum, limitNum});

        const total = this.alojamientoRepository.coutAll();
        const totla_pages = Math.ceil(total / limitNum);
        const data = alojamientos.map(a => this.toDTO(a));

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            totla_pages: totla_pages,
            data: data
        };
    }

    create(alojamiento) {
        // anfitrion es en realidad el id, lo mismo con la direccion
        const { idAnfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, calle, altura, ciudad, pais, cantHuespedesMax, caracteristicas, fotos} = alojamiento;
        
        const existente = this.alojamientoRepository.findByName(nombre);
        if(existente) return null;
        
        const anfitrion = this.anfitrionRepository.findById(idAnfitrion)

        // const ciudad = this.ciudadRepository.findByName(ciudad)
        // const pais = this.paisRepository.findByName(pais)

        const direccion = new Direccion(calle, altura, ciudad)

        const nuevo = new Alojamiento(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, fotos);

        this.alojamientoRepository.save(nuevo);
        return this.toDTO(nuevo);
    }

    delete(id) {
        return this.alojamientoRepository.deleteById(id);
    }

    toDTO(alojamiento) {
        const direccion = alojamiento.direccion.ciudad.pais + ", " +
                          alojamiento.direccion.ciudad.nombre + ", " +
                          alojamiento.direccion.calle + " " +
                          alojamiento.direccion.altura
        return {
            id: alojamiento.id,
            anfitrion: alojamiento.anfitrion.id,
            nombre: alojamiento.nombre,
            descripcion: alojamiento.descripcion,
            precioPorNoche: alojamiento.precioPorNoche,
            moneda: alojamiento.moneda,
            horarioCheckIn: alojamiento.horarioCheckIn,
            horarioCheckOut: alojamiento.horarioCheckOut,
            direccion: direccion,
            cantHuespedesMax: alojamiento.cantHuespedesMax,
            caracteristicas: alojamiento.caracteristicas,
            fotos: alojamiento.fotos
        }
    }
}