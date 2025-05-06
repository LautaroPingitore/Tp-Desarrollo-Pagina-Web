export class ReservaController {
    contructor(ReservaService) {
        this.reservaService = ReservaService
    }

    create(req, res){
        const reserva = req.body
        const { idHuespedReservador, cantHuespedes, idAlojamiento, fehcaInicio, fechaFin, precioPorNoche } = reserva

        if(!idHuespedReservador || !cantHuespedes || !idAlojamiento || !fechaInicio || !fechaFin || !precioPorNoche) {
            return res.status(400).json({ error: "Faltan datos obligatorios"})
        }

        const nuevo = this.reservaService.create(reserva)

        if(!nuevo) {
            return res.status(409).json({ error: "Reserva ya existente"})
        }

        res.status(201).json(nuevo)
    }
    
    findAll(req, res) {
        const { page, limit } = req.query
        const reservas = this.reservaService.findAll({ page, limit })
        res.json(reservas)
    }
    
}

