import { Anfitrion } from "../models/entities/Anfitrion.js"
import { ValidationError, ConflictError, NotFoundError } from "../errors/AppError.js"

export class AnfitrionService {
    constructor(anfitrionRepository) {
        this.anfitrionRepository = anfitrionRepository
    }

    async findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let anfitrion = await this.anfitrionRepository.findByPage(pageNum, limit)

        const total = await this.anfitrionRepository.countAll()
        const total_pages = Math.ceil(total / limitNum)
        const data = anfitrion.map(a => this.toDTO(a))

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            total_pages: total_pages,
            data: data
        };
    }

    async logIn(datos) {
        const {email, contrasenia} = datos

        if(!email || !contrasenia) {
            throw new ValidationError("Faltan datos obligatorios")
        }

        const usuario = await this.anfitrionRepository.findByEmail(email)
        if(!usuario) {
            throw new NotFoundError("Email o Contraseña incorrectas")
        }

        if(usuario.contrasenia != contrasenia) {
            throw new ValidationError("Email o Contraseña incorrectas")
        }

        return this.toDTO(usuario)
    }

    async create(anfitrion) {
        const { nombre, apellido, email, contrasenia } = anfitrion

        if(!nombre || !apellido || !email || !contrasenia) {
            throw new ValidationError("Faltan datos obligatorios")
        }

        const mailExistente = await this.anfitrionRepository.findByEmail(email)

        if(mailExistente) {
            throw new ConflictError(`Email ya registrado`)
        }

        const nuevoAnfitrion = new Anfitrion(nombre, apellido, email, contrasenia)
        const anfitrionDB = await this.anfitrionRepository.save(nuevoAnfitrion)
        return this.toDTO(anfitrionDB)
    }

    async delete(id) {
        const borrado = await this.anfitrionRepository.deleteById(id)
        if(!borrado){
            throw new NotFoundError(`Anfitrion con id ${id} no encontrado`);
        }
        return borrado;
    }

    async update(id, datos) {
        const anfitrion = await this.anfitrionRepository.findById(id)
        if(!anfitrion) {
            throw new NotFoundError(`Anfitrion con id ${id} no encontrado`)
        }

        if(datos.nombre) {
            anfitrion.nombre = datos.nombre
        }

        if(datos.apellido) {
            anfitrion.apellido = datos.apellido
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

    async updateNotificacionLeida(id, idNotificacion) {
        const anfitrion = await this.anfitrionRepository.findById(id)
        if(!anfitrion) {
            throw new NotFoundError(`Anfitrion con id ${id} no encontrado`)
        }
        const index = anfitrion.notificaciones.findIndex(n => n.id == idNotificacion)
        if(index == -1) {
            throw new NotFoundError(`Notificacion con id ${idNotificacion} no encontrada`)
        }

        const notificacion = anfitrion.notificaciones[index]
        notificacion.leida = true
        notificacion.fechaLeida = new Date()
        anfitrion.notificaciones[index] = notificacion
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

    async getNotificaciones(id, leida, page, limit) {
        const anfitrion = await this.anfitrionRepository.findById(id)
        if(!anfitrion) {
            throw new NotFoundError(`Anfitrion con id ${id} no encontrado`)
        }

        leida = leida.toLowerCase()
        const notificaciones = anfitrion.notificaciones;
        let data
        if(leida === "true") {
            data = notificaciones.filter(n => n.leida).map(n => this.notificacionToDTO(n))
        } else if(leida === "false") {
            data = notificaciones.filter(n => !n.leida).map(n => this.notificacionToDTO(n))
        } else {
            throw new ValidationError(`${leida} no corresponde a true o false`)
        }

        const total = data.length
        const total_pages = Math.ceil(total / limit)
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const dataNew = data.slice(startIndex, endIndex)

        return {
            page: page,
            per_page: limit,
            total: total,
            total_pages: total_pages,
            data: dataNew
        }
    }

    async leerNotificacion(idUsuario, idNotificacion) {
        const anfitrion = await this.anfitrionRepository.findById(idUsuario)
        if(!anfitrion) {
            throw new NotFoundError(`Anfitrion con id ${id} no encontrado`)
        }

        const index = anfitrion.notificaciones.findIndex(n => n.id == idNotificacion)
        if(index == -1) {
            throw new NotFoundError(`Notificacion con ${idNotificacion} no encontrada`)
        }
        
        const notificacion = anfitrion.notificaciones[index]
        notificacion.leida = true
        notificacion.fechaLeida = new Date()
        anfitrion.notificaciones[index] = notificacion

        await this.anfitrionRepository.save(anfitrion)

        return this.notificacionToDTO(notificacion)
    }

    toDTO(anfitrion) {
        return {
            id: anfitrion.id.toString(),
            nombre: anfitrion.nombre,
            apellido: anfitrion.apellido,
            email: anfitrion.email,
            notificaciones: (anfitrion.notificaciones || []).map(n => this.notificacionToDTO(n))
        }
    }

    notificacionToDTO(notificacion) {
        return {
            id: notificacion.id,
            mensaje: notificacion.mensaje,
            fechaAlta: notificacion.fechaAlta,
            fechaLeida: notificacion.fechaLeida
        }
    }
}

