import { NotFoundError, ValidationError } from "../errors/AppError.js";
import { Reserva } from "../models/entities/Reserva.js";

export class ReservaService {
    constructor(reservaRepository, huespedRepository) {
        this.reservaRepository = reservaRepository
        this.huespedRepository = huespedRepository
    }

    async findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let reservas = this.reservaRepository.findByPage(pageNum, limit);

        const total = this.reservaRepository.countAll();
        const totla_pages = Math.ceil(total / limitNum);
        const data = reservas.map(r => this.toDTO(r));

        return {
            page: pageNum,
            per_page: limitNum,
            total: total,
            totla_pages: totla_pages,
            data: data
        };
    }

    async findById(id) {
        let reserva = this.reservaRepository.findById(id);
        return reserva ? this.toDTO(reserva) : null;
    }

    async create(reserva) {
        const {reservador, cantHuespedes, alojamiento, fechas} = reserva
        if(!reservador || !cantHuespedes || !alojamiento || !fechas) {
            throw new ValidationError("Faltan datos obligatorios")
        }

        const huesped = this.huespedRepository.findByName(reservador)
        if(!huesped) {
            throw new NotFoundError("Huesped no existente")
        }

        const alojamientoObject = this.alojamientoRepository.findByName(alojamiento)
        if(!alojamientoObject) {
            throw new NotFoundError("Alojamiento no existente")
        }

        const objectFechas = new RangoFechas(fechas.fechaInicio, fechas.fechaFin)
        const fechaActual = new Date()

        const nuevaReserva = new Reserva(fechaActual, huesped, cantHuespedes, alojamientoObject, objectFechas)

        this.reservaRepository.save(nuevaReserva)
        return this.toDTO(nuevaReserva)
    }

    async update(reserva) {
        // TODO
    }

    async delete(id) {
        const borrado = await this.reservaRepository.deleteById(id);
        if(!borrado){
            throw new NotFoundError(`Reserva con id ${id} no encontrado`);
        }
        return borrado;
    }

    toDTO(reserva) {
        return {
            id: reserva.id,
            fechaAlta: reserva.fechaAlta,
            huespedReservador: {
                nombre: reserva.huespedReservador.nombre,
                email: reserva.huespedReservador.email
            },
            cantHuespedes: reserva.cantHuespedes,
            alojamiento: reserva.alojamiento.nombre,
            fechas: {
                fechaInicio: reserva.rangoFecha.fechaInicio,
                fechaFin: reserva.rangoFecha.fechaFin
            },
            estado: reserva.EstadoReserva
        }
    }
}