

export class ReservaService {
    constructor(reservaRepository, huespedRepository) {
        this.reservaRepository = reservaRepository
        this.huespedRepository = huespedRepository
    }

    findAll({page = 1, limit = 10}) {
        const pageNum = Math.max(Number(page), 1)
        const limitNum = Math.min(Math.max(Number(limit), 1), 100)

        let reservas = this.reservaRepository.findByPage(pageNum, limit);

        const total = this.reservaRepository.coutAll();
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

    findById(id) {
        let reserva = this.reservaRepository.findById(id);
        return reserva ? this.toDTO(reserva) : null;
    }

    create(reserva) {
        const {idHuespedReservador, cantHuespedes, alojamiento, fechaInicio, fechaFin, estado, precioPorNoche} = reserva

        const huesped = this.huespedRepository.findById(idHuespedReservador)
        if(!huesped) return { error: "Huesped-inexistente"}

        const fechas = new RangoFechas(fechaInicio, fechaFin)
        const fechaActual = new Date()

        const reserva = new Reserva(fechaActual, huesped, cantHuespedes, alojamiento, fechas, precioPorNoche)

        this.reservaRepository.save(reserva)
        return this.toDTO(reserva)
    }

    // Actualizar Estado

    delete(id) {
        return this.reservaRepository.deleteById(id)
    }

    toDTO(reserva) {
        const rangoFechas = reserva.rangoFecha.fechaInicio + " - " + reserva.rangoFecha.fechaFin
        return {
            id: reserva.id,
            fechaAlta: reserva.fechaAlta,
            huespedReservador: reserva.huespedReservador.id,
            cantHuespedes: reserva.cantHuespedes,
            alojamiento: reserva.alojamiento.id,
            fechas: rangoFechas,
            estado: reserva.EstadoReserva,
            precioPorNoche: reserva.precioPorNoche
        }
    }
}