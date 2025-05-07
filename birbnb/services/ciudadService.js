import { Ciudad } from "../models/entities/Ciudad.js"
import { Pais } from "../models/entities/Pais.js"

export class CiudadService {
    constructor(ciudadRepository, paisRepository) {
        this.ciudadRepository = ciudadRepository
        this.paisRepository = paisRepository
    }

    findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let ciudades = this.ciudadRepository.findByPage(pageNum, limit)

        const total = this.ciudadRepository.countAll()
        const totla_pages = Math.ceil(total / limitNum)
        const data = anfitrion.map(a => this.toDTO(a))

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            totla_pages: totla_pages,
            data: data
        };
    }

    create(ciudad) {
        const { nombre, pais } = ciudad

        const ciudadExistente = this.ciudadRepository.findByName(nombre)
        if(ciudadExistente) return null

        let paisExistente = this.paisRepository.findByName(pais)
        if(!paisExistente) {
            paisExistente = new Pais(pais)
            this.paisRepository.save(paisExistente)
        }
        
        const nuevaCiudad = new Ciudad(nombre, paisExistente)
        this.ciudadRepository.save(nuevaCiudad)

        return this.toDTO(nuevaCiudad)
        
    }

    toDTO(ciudad) {
        return {
            id: ciudad.id,
            nombre: ciudad.nombre,
            pais: ciudad.pais.nombre
        }
    }
}