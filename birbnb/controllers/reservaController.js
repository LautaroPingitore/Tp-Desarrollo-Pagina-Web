export class ReservaController {
    contructor(ReservaService) {
        this.reservaService = ReservaService
    }

    async create(req, res, next){
        try {
            const reserva = req.body    
            const nuevo = this.reservaService.create(reserva)
    
            res.status(201).json(nuevo)
        } catch(error) {
            next(error)
        }
    }
    
    async findAll(req, res, next) {
        try {
            const { page, limit } = req.query
            const reservas = this.reservaService.findAll({ page, limit })
            res.json(reservas)
        } catch(error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {

        } catch(error) {
            next(error)
        }
    }
    
}

