import { Huesped } from "../models/entities/Huesped.js"

export class HuespedService {
    constructor(huespedRepository) {
        this.huespedRepository = huespedRepository
    }

    findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let huesped = this.huespedRepository.findByPage(pageNum, limit)

        const total = this.huespedRepository.countAll()
        const totla_pages = Math.ceil(total / limitNum)
        const data = huesped.map(a => this.toDTO(a))

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            totla_pages: totla_pages,
            data: data
        };
    }

    create(huesped) {
        const { nombre, email } = huesped

        const nombreExistente = this.huespedRepository.findByName(nombre) 
        const mailExistente = this.huespedRepository.findByEmail(email)

        if(nombreExistente || mailExistente) return null


        const nuevoHuesped = new Huesped(nombre, email)

        this.huespedRepository.save(nuevoHuesped)

        return this.toDTO(nuevoHuesped)
    }

    delete(id) {
        return this.huespedRepository.deleteById(id)
    }

    update(id, datos) {
        const huesped = this.huespedRepository.findById(id)
        if(!huesped) return { error: "not-found" }

        if(datos.nombre) {
            const otroMismoNombre = this.huespedRepository.findByName(datos.nombre)
            if(otroMismoNombre && otroMismoNombre.id !== id) return { error : "name-duplicated" }

            huesped.nombre = datos.nombre
        }
        if(datos.email) {
            const otroMismoEmail = this.huespedRepository.findByEmail(datos.email)
            if(otroMismoEmail && otroMismoEmail.id !== id) return { error : "mail-duplicated" }

            huesped.email = datos.email
        }

        const actualizado = this.huespedRepository.update(huesped)
        return this.toDTO(actualizado)
    }

    updateNotificacion(id, notificacion) {
        const huesped = this.huespedRepository.findById(id)
        if(!huesped) return { error: "not-found" }

        huesped.recibirNotificacion(notificacion)

        const actualizado = this.huespedRepository.update(huesped)
        return this.toDTO(actualizado)
    }

    toDTO(huesped) {
        return {
            id: huesped.id,
            nombre: huesped.nombre,
            email: huesped.email,
            notificaciones: huesped.notificaciones            
        }
    }
}