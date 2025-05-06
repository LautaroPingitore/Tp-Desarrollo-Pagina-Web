import { Huesped } from "../models/entities/Huesped.js"

export class HuespedService {
    constructor(huespedRepository) {
        this.huespedRepository = huespedRepository
    }

    create(huesped) {
        const { nombre, email } = huesped

        const nombreExistente = this.huespedRepository.findByName(nombre) 
        const mailExistente = this.huespedRepository.findByEmail(email)

        if(nombreExistente || mailExistente) return null


        const huesped = new Huesped(nombre, email)

        this.huespedRepository.save(huesped)

        return this.toDto(huesped)
    }

    delete(id) {
        return this.huespedRepository.deleteById(id)
    }

    update(id, datos) {
        const huesped = this.huespedRepository.findById(id)
        if(!huesped) return { error: "not-found" }

        if(datos.nombre) {
            const otroMismoNombre = this.huespedRepository.findByName(datos.nombre)
            if(otroMismoNombre && otroMismoNombre.id !== datos.id) return { error : "name-duplicated" }

            huesped.nombre = datos.nombre
        }
        if(datos.email) {
            const otroMismoEmail = this.huespedRepository.findByEmail(datos.email)
            if(otroMismoEmail && otroMismoEmail.id !== datos.id) return { error : "mail-duplicated" }

            huesped.email = datos.email
        }

        const actualizado = this.huespedRepository.update(huesped)
        return this.toDTO(actualizado)
    }

    toDTO(huesped) {
        return {
            nombre: huesped.nombre,
            email: huesped.email,
            notificaciones: huesped.notificaciones            
        }
    }
}