import { Anfitrion } from "../models/entities/Anfitrion.js"
import { ConflictError, NotFoundError } from "../errors/AppError.js"

export class AnfitrionService {
    constructor(anfitrionRepository) {
        this.anfitrionRepository = anfitrionRepository
    }

    async findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let anfitrion = await this.anfitrionRepository.findByPage(pageNum, limit)

        const total = await this.anfitrionRepository.countAll()
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

    async create(anfitrion) {
        const { nombre, email } = anfitrion

        if(!nombre || !email) {
            throw new ValidationError("Faltan datos obligatorios")
        }

        const nombreExistente = await this.anfitrionRepository.findByName(nombre) 
        const mailExistente = await this.anfitrionRepository.findByEmail(email)

        if(nombreExistente) {
            throw new ConflictError(`Anfitrion con nombre ${nombre} ya existe`)
        }
        if(mailExistente) {
            throw new ConflictError(`Anfitrion con email ${email} ya existe`)
        }


        const nuevoAnfitrion = new Anfitrion(nombre, email)

        await this.anfitrionRepository.save(nuevoAnfitrion)

        return this.toDTO(nuevoAnfitrion)
    }

    async delete(id) {
        const borrado = await this.anfitrionRepository.deleteById(id)
        if(!borrado){
            throw new notFoundError(`Anfitrion con id ${id} no encontrado`);
        }
        return borrado;
    }

    async update(id, datos) {
        const anfitrion = await this.anfitrionRepository.findById(id)
        if(!anfitrion) {
            throw new NotFoundError(`Anfitrion con id ${id} no encontrado`)
        }

        if(datos.nombre) {
            const otroMismoNombre = await this.anfitrionRepository.findByName(datos.nombre)
            if(otroMismoNombre && otroMismoNombre.id !== id) {
                throw new ConflictError(`Anfitrion con nombre ${datos.nombre} ya existe`)
            }

            anfitrion.nombre = datos.nombre
        }

        if(datos.email) {
            const otroMismoEmail = await this.anfitrionRepository.findByEmail(datos.email)
            if(otroMismoEmail && otroMismoEmail.id !== id) {
                throw new ConflictError(`Anfitrion con email ${datos.email} ya existe`)
            }

            anfitrion.email = datos.email
        }

        const actualizado = await this.anfitrionRepository.save(anfitrion)
        return this.toDTO(actualizado)
    }

    async updateNotificacion(id, notificacion) {
        const anfitrion = await this.anfitrionRepository.findById(id)
        if(!anfitrion) {
            throw new NotFoundError(`Anfitrion con id ${id} no encontrado`)
        }

        anfitrion.recibirNotificacion(notificacion)

        const actualizado = await this.anfitrionRepository.save(anfitrion)
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

