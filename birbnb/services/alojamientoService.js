import { Alojamiento } from "../models/entities/Alojamiento.js";
import { Direccion } from "../models/entities/Direccion.js";
import { Pais } from "../models/entities/Pais.js";
import { Ciudad } from "../models/entities/Ciudad.js";
import { ConflictError, NotFoundError, ValidationError } from "../errors/AppError.js";

export class AlojamientoService {
    constructor(alojamientoRepository, anfitrionRepository, ciudadRepository, paisRepository) {
        this.alojamientoRepository = alojamientoRepository
        this.anfitrionRepository = anfitrionRepository
        this.ciudadRepository = ciudadRepository
        this.paisRepository = paisRepository
    }

    async findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let alojamientos = await this.alojamientoRepository.findByPage(pageNum, limit)

        const total = await this.alojamientoRepository.countAll()
        const total_pages = Math.ceil(total / limitNum)
        const data = alojamientos.map(a => this.toDTO(a))

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            total_pages: total_pages,
            data: data
        };
    }

    async findById(id) {
        let alojamiento = await this.alojamientoRepository.findById(id)
        if(!alojamiento) {
            throw new NotFoundError(`Alojamiento con id ${id} no encontrado`)
        }
        return this.toDTO(alojamiento)
    }

    async findByFilters(filtro,{page=1,limit=10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let alojamientos = await this.alojamientoRepository.findByFilters(filtro);

        const total = alojamientos.length;
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const total_pages = Math.ceil(total / limitNum);

        const data = alojamientos.slice(startIndex, endIndex).map(a => this.toDTO(a));

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            total_pages: total_pages,
            data: data
        };
    }

    async create(alojamiento) {
        const { anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, fotos} = alojamiento;
        
        if(!anfitrion || !nombre || !descripcion || !precioPorNoche || !moneda || !horarioCheckIn || !horarioCheckOut || !direccion || !cantHuespedesMax || !caracteristicas || !fotos) {
            throw new ValidationError("Faltan datos obligatorios");
        }
        
        const existente = await this.alojamientoRepository.findByName(nombre);
        if(existente) {
            throw new ConflictError(`Alojamiento con nombre ${nombre} ya existe`)
        };
        
        const anfitrionExistente = await this.anfitrionRepository.findByName(anfitrion);
        if(!anfitrionExistente) {
            throw new NotFoundError(`Anfitrion con nombre ${anfitrion} no encontrado`)
        };

        let paisExistente = await this.paisRepository.findByName(direccion.ciudad.pais.nombre)
        if(!paisExistente) {
            paisExistente = new Pais(direccion.ciudad.pais.nombre)
            await this.paisRepository.save(paisExistente)
        }

        let ciudadExistente = await this.ciudadRepository.findByName(direccion.ciudad.nombre)
        if(!ciudadExistente) {
            ciudadExistente = new Ciudad(direccion.ciudad.nombre, paisExistente)
            await this.ciudadRepository.save(ciudadExistente)
        }

        const objectDireccion = new Direccion(direccion.calle, direccion.altura, ciudadExistente)

        const nuevo = new Alojamiento(anfitrionExistente, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, objectDireccion, cantHuespedesMax, caracteristicas, fotos);

        await this.alojamientoRepository.save(nuevo);
        return this.toDTO(nuevo);
    }

    async delete(id) {
        const borrado = await this.alojamientoRepository.deleteById(id);
        if(!borrado){
            throw new notFoundError(`Alojamiento con id ${id} no encontrado`);
        }
        return borrado;
    }

    toDTO(alojamiento) {
        return {
            id: alojamiento.id,
            anfitrion: {
                nombre: alojamiento.anfitrion.nombre,
                email: alojamiento.anfitrion.email,
            },
            nombre: alojamiento.nombre,
            descripcion: alojamiento.descripcion,
            precioPorNoche: alojamiento.precioPorNoche,
            moneda: alojamiento.moneda,
            horarioCheckIn: alojamiento.horarioCheckIn,
            horarioCheckOut: alojamiento.horarioCheckOut,
            direccion: {
                calle: alojamiento.direccion.calle,
                altura: alojamiento.direccion.altura,
                ciudad: {
                    nombre: alojamiento.direccion.ciudad.nombre,
                    pais: alojamiento.direccion.ciudad.pais.nombre
                }
            },
            cantHuespedesMax: alojamiento.cantHuespedesMax,
            caracteristicas: alojamiento.caracteristicas,
            fotos: alojamiento.fotos
        }
    }
}