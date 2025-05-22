import { NotFoundError, ValidationError } from "../errors/AppError.js";
import { RangoFechas } from "../models/entities/RangoFechas.js"
import { Reserva } from "../models/entities/Reserva.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { EstadoReserva } from "../models/entities/enums/EstadoReserva.js";

dayjs.extend(customParseFormat)

export class ReservaService {
    constructor(reservaRepository, alojamientoRepository, huespedRepository, anfitrionRepository) {
        this.reservaRepository = reservaRepository
        this.alojamientoRepository = alojamientoRepository
        this.huespedRepository = huespedRepository
        this.anfitrionRepository = anfitrionRepository
    }

    async findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let reservas = await this.reservaRepository.findByPage(pageNum, limit);

        const total = await this.reservaRepository.countAll();
        const total_pages = Math.ceil(total / limitNum);
        const data = reservas.map(r => this.toDTO(r));

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            total_pages: total_pages,
            data: data
        };
    }

    async findById(id) {
        let reserva = await this.reservaRepository.findById(id);
        return reserva ? this.toDTO(reserva) : null;
    }

    async findByUsuario({page = 1, limit = 10, id}) {

        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        const huesped = await this.huespedRepository.findById(id)
        if(!huesped) {
            throw new NotFoundError("Huesped no existente")
        }

        const reservas = await this.reservaRepository.findByUsuario(pageNum, limit, id)

        const total = await this.reservaRepository.countAll()
        const total_pages = Math.ceil(total / limitNum);
        const data = reservas.map(r => this.toDTO(r))

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            total_pages: total_pages,
            data: data
        }
    }

    async create(reserva) {
        const { reservador, cantHuespedes, alojamiento, rangoFechas } = reserva

        if(!reservador || !cantHuespedes || !alojamiento || !rangoFechas) {
            throw new ValidationError("Faltan datos obligatorios")
        }

        const huesped = await this.huespedRepository.findByName(reservador)
        if(!huesped) {
            throw new NotFoundError("Huesped no existente")
        }

        const alojamientoObject = await this.alojamientoRepository.findByName(alojamiento)
        if(!alojamientoObject) {
            throw new NotFoundError("Alojamiento no existente")
        }

        const parsearFecha = (fechaStr, formato) => {
            const fecha = dayjs(fechaStr, formato, true); // true = modo estricto
            if (!fecha.isValid()) {
                throw new ValidationError(`Fecha inválida: ${fechaStr}. Formato requerido: ${formato}`);
            }
            return fecha.toDate();
        };

        const objectFechas = new RangoFechas(
            parsearFecha(rangoFechas.fechaInicio, "DD/MM/YYYY"),
            parsearFecha(rangoFechas.fechaFin, "DD/MM/YYYY")
        )

        const fechaActual = new Date()

        if (!alojamientoObject.puedenAlojarse(cantHuespedes)) {
            throw new ValidationError("Cantidad de huéspedes supera la capacidad")
        }

        const reservasDeAlojamiento = await this.reservaRepository.findByAlojamiento(alojamientoObject.id)
        if (!alojamientoObject.estasDisponibleEn(reservasDeAlojamiento, objectFechas)) {
            throw new ValidationError("El alojamiento no está disponible en las fechas indicadas")
        }
        
        const nuevaReserva = new Reserva(fechaActual, huesped, cantHuespedes, alojamientoObject, objectFechas)
        
        const anfitrionActualizado = nuevaReserva.notificar()

        await this.anfitrionRepository.save(anfitrionActualizado)
        await this.reservaRepository.save(nuevaReserva)
        return this.toDTO(nuevaReserva)
    }

    async modificarEstado(idUsuario, idReserva, nuevoEstado, motivo=null) {
        nuevoEstado = nuevoEstado.toUpperCase()

        const reserva = await this.reservaRepository.findById(idReserva)
        if(!reserva) {
            throw new NotFoundError(`Reserva ${idReserva} inexistente`)
        }

        if(nuevoEstado == "CONFIRMADA") {
            if(reserva.estado == EstadoReserva.CONFIRMADA) {
                throw new ValidationError("Reserva ya confirmada")
            }
            
            const anfitrion = await this.anfitrionRepository.findById(idUsuario)
            if(!anfitrion) {
                throw new NotFoundError("Anfitrion no encontrado")
            }
            if(anfitrion.nombre !== reserva.alojamiento.anfitrion.nombre) {
                throw new ValidationError("Anfitrion pasado no corresponde al del alojamiento")
            }

            const huespedActualizado = reserva.notificarCambioEstado(EstadoReserva.CONFIRMADA)
            await this.huespedRepository.save(huespedActualizado)
            await this.reservaRepository.save(reserva)
        
        } else if(nuevoEstado == "CANCELADA") {
            if(reserva.estado == EstadoReserva.CANCELADA) {
                throw new ValidationError("Reserva ya cancelada")
            }

            const huesped = await this.huespedRepository.findById(idUsuario)
            if(!huesped) {
                throw new NotFoundError("Huesped no encontrado")
            }
            if(huesped.nombre !== reserva.huespedReservador.nombre) {
                throw new ValidationError("Huesped pasado no corresponde al de la reserva")
            }

            const fechaActual = new Date()
            if(reserva.rangoFechas.fechaInicio < fechaActual) {
                throw new ValidationError("No se puede cancelar luego de pasada la fecha inicio")
            }
            
            const anfitrionActualizado = reserva.notificarCambioEstado(EstadoReserva.CANCELADA, motivo)
            await this.anfitrionRepository.save(anfitrionActualizado)
            await this.reservaRepository.save(reserva)

        } else {
            throw new ValidationError(`Estado ${nuevoEstado} desconocido`)
        }
    }

    async update(reserva, idHuesped) {
        const {idReserva, cantHuespedes, rangoFechas} = reserva
        if(!idReserva || !cantHuespedes || !rangoFechas) {
            throw new ValidationError("Faltan datos obligatorios")
        }

        const reservaExistente = await this.reservaRepository.findById(idReserva)
        if(!reservaExistente) {
            throw new NotFoundError("Reserva no existente")
        }

        const huespedExistente = await this.huespedRepository.findById(idHuesped)
        if(!huespedExistente) {
            throw new NotFoundError("Huesped no existente")
        }
        if(reserva.huespedReservador.nombre !== huespedExistente.nombre) {
            throw new ValidationError(`La reserva no esta a nombre del huesped ${huespedExistente.nombre}`)
        }

        const alojamiento = reserva.alojamiento

        const objectFechas = new RangoFechas(
            dayjs(rangoFechas.fechaInicio, "DD/MM/YYYY"),
            dayjs(rangoFechas.fechaFin, "DD/MM/YYYY")
        )
        
        if (!alojamiento.puedenAlojarse(cantHuespedes)) {
            throw new ValidationError("Cantidad de huéspedes supera la capacidad")
        }
        
        if (!alojamiento.estasDisponibleEn(objectFechas)) {
            throw new ValidationError("El alojamiento no está disponible en las fechas indicadas")
        }
        
        const anfitrionActualizado = reservaExistente.notificarActualizacion()
        await this.anfitrionRepository.save(anfitrionActualizado)

        reservaExistente.cantHuespedes = cantHuespedes
        reservaExistente.rangoFechas = objectFechas

        await this.reservaRepository.save(reservaExistente)
        return this.toDTO(reservaExistente)
    }

    async delete(id) {
        const borrado = await this.reservaRepository.deleteById(id);
        if(!borrado){
            throw new NotFoundError(`Reserva con id ${id} no encontrado`);
        }
        return borrado;
    }

    toDTO(reserva) {
        const fechaInicio = dayjs(reserva.rangoFechas.fechaInicio).format("DD/MM/YYYY");
        const fechaFin = dayjs(reserva.rangoFechas.fechaFin).format("DD/MM/YYYY");

        return {
            id: reserva.id,
            fechaAlta: reserva.fechaAlta,
            huespedReservador: {
                nombre: reserva.huespedReservador.nombre,
                email: reserva.huespedReservador.email
            },
            cantHuespedes: reserva.cantHuespedes,
            alojamiento: reserva.alojamiento.nombre,
            rangoFechas: {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            },
            estado: reserva.estado
        }
    }
}