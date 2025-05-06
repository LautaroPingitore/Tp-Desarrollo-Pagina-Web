import { Anfitrion } from "../models/entities/Anfitrion.js"

export class AnfitrionService {
    constructor(anfitironRepository) {
        this.anfitrionRepository = anfitrionRepository
    }

    create(anfitrion) {
        const { nombre, email } = anfitrion

        const nombreExistente = this.anfitrionRepository.findByName(nombre) 
        const mailExistente = this.anfitrionRepository.findByEmail(email)

        if(nombreExistente || mailExistente) return null


        const anfitrion = new Anfitrion(nombre, email)

        this.anfitrionRepository.save(anfitrion)

        return this.toDto(anfitrion)
    }

    delete(id) {
        return this.anfitrionRepository.deleteById(id)
    }

    update(id, datos) {
        const anfitrion = this.anfitrionRepository.findById(id)
        if(!anfitrion) return { error: "not-found" }

        if(datos.nombre) {
            const otroMismoNombre = this.anfitrionRepository.findByName(datos.nombre)
            if(otroMismoNombre && otroMismoNombre.id !== datos.id) return { error : "name-duplicated" }

            anfitrion.nombre = datos.nombre
        }
        if(datos.email) {
            const otroMismoEmail = this.anfitrionRepository.findByEmail(datos.email)
            if(otroMismoEmail && otroMismoEmail.id !== datos.id) return { error : "mail-duplicated" }

            anfitrion.email = datos.email
        }

        const actualizado = this.anfitrionRepository.update(anfitrion)
        return this.toDTO(actualizado)
    }

    toDTO(anfitrion) {
        return {
            nombre: anfitrion.nombre,
            email: anfitrion.email,
            notificaciones: anfitrion.notificaciones            
        }
    }
}