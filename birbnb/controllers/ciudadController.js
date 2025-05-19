export class CiudadController {
    constructor(ciudadService) {
        this.ciudadService = ciudadService
    }

    async findAll(req, res, next) {
        try {
            const { page, limit } = req.query 
            const ciudades = await this.ciudadService.findAll({ page, limit })
            res.json(ciudades)

        } catch(error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const ciudad = req.body
            const nuevo = await this.ciudadService.create(ciudad)
            
            res.status(201).json(nuevo);
        } catch(error) {
            next(error)
        }

    }
}