import { Huesped } from "../models/entities/Huesped.js"
import { ConflictError, NotFoundError } from "../errors/AppError.js"

export class HuespedService {
    constructor(huespedRepository) {
        this.huespedRepository = huespedRepository
    }

    async findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let huesped = await this.huespedRepository.findByPage(pageNum, limit)

        const total = await this.huespedRepository.countAll()
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

    async create(huesped) {
        const { nombre, email } = huesped

        if(!nombre || !email) {
            throw new ValidationError("Faltan datos obligatorios")
        }

        const nombreExistente = await this.huespedRepository.findByName(nombre) 
        const mailExistente = await this.huespedRepository.findByEmail(email)

        if(nombreExistente) {
            throw new ConflictError(`Huesped con nombre ${nombre} ya existe`)
        }
        if(mailExistente) {
            throw new ConflictError(`Huesped con email ${email} ya existe`)
        }


        const nuevohuesped = new Huesped(nombre, email)

        await this.huespedRepository.save(nuevohuesped)

        return this.toDTO(nuevohuesped)
    }

    async delete(id) {
        const borrado = await this.huespedRepository.deleteById(id)
        if(!borrado){
            throw new notFoundError(`Huesped con id ${id} no encontrado`);
        }
        return borrado;
    }

    async update(id, datos) {
        const huesped = await this.huespedRepository.findById(id)
        if(!huesped) {
            throw new NotFoundError(`Huesped con id ${id} no encontrado`)
        }

        if(datos.nombre) {
            const otroMismoNombre = await this.huespedRepository.findByName(datos.nombre)
            if(otroMismoNombre && otroMismoNombre.id !== id) {
                throw new ConflictError(`Huesped con nombre ${datos.nombre} ya existe`)
            }

            huesped.nombre = datos.nombre
        }

        if(datos.email) {
            const otroMismoEmail = await this.huespedRepository.findByEmail(datos.email)
            if(otroMismoEmail && otroMismoEmail.id !== id) {
                throw new ConflictError(`Huesped con email ${datos.email} ya existe`)
            }

            huesped.email = datos.email
        }

        const actualizado = await this.huespedRepository.save(huesped)
        return this.toDTO(actualizado)
    }

    async updateNotificacion(id, notificacion) {
        const huesped = await this.huespedRepository.findById(id)
        if(!huesped) {
            throw new NotFoundError(`Huesped con id ${id} no encontrado`)
        }

        huesped.recibirNotificacion(notificacion)

        const actualizado = await this.huespedRepository.save(huesped)
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

