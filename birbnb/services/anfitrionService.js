import { Anfitrion } from "../models/entities/Anfitrion.js"

export class AnfitrionService {
    constructor(anfitrionRepository) {
        this.anfitrionRepository = anfitrionRepository
    }

    findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let anfitrion = this.anfitrionRepository.findByPage(pageNum, limit)

        const total = this.anfitrionRepository.countAll()
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

    create(anfitrion) {
        const { nombre, email } = anfitrion

        const nombreExistente = this.anfitrionRepository.findByName(nombre) 
        const mailExistente = this.anfitrionRepository.findByEmail(email)

        if(nombreExistente || mailExistente) return null


        const nuevoAnfitrion = new Anfitrion(nombre, email)

        this.anfitrionRepository.save(nuevoAnfitrion)

        return this.toDTO(nuevoAnfitrion)
    }

    delete(id) {
        return this.anfitrionRepository.deleteById(id)
    }

    update(id, datos) {
        const anfitrion = this.anfitrionRepository.findById(id)
        if(!anfitrion) return { error: "not-found" }

        if(datos.nombre) {
            const otroMismoNombre = this.anfitrionRepository.findByName(datos.nombre)
            if(otroMismoNombre && otroMismoNombre.id !== id) return { error : "name-duplicated" }

            anfitrion.nombre = datos.nombre
        }
        if(datos.email) {
            const otroMismoEmail = this.anfitrionRepository.findByEmail(datos.email)
            if(otroMismoEmail && otroMismoEmail.id !== id) return { error : "mail-duplicated" }

            anfitrion.email = datos.email
        }

        const actualizado = this.anfitrionRepository.update(anfitrion)
        return this.toDTO(actualizado)
    }

    updateNotificacion(id, notificacion) {
        const anfitrion = this.anfitrionRepository.findById(id)
        if(!anfitrion) return { error: "not-found" }

        anfitrion.recibirNotificacion(notificacion)

        const actualizado = this.anfitrionRepository.update(anfitrion)
        return this.toDTO(actualizado)
    }

    toDTO(anfitrion) {
        return {
            id: anfitrion.id,
            nombre: anfitrion.nombre,
            email: anfitrion.email,
            notificaciones: anfitrion.notificaciones            
        }
    }
}