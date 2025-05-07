export class CiudadController {
    constructor(ciudadService) {
        this.ciudadService = ciudadService
    }

    findAll = (req, res) => {
        const { page, limit } = req.query 
        const ciudades = this.ciudadService.findAll({ page, limit })
        res.json(ciudades)
    }

    create = (req, res) => {
        const ciudad = req.body
        const { nombre, pais } = ciudad

        if(!nombre || !pais) {
            return res.status(400).json({ error: "Faltan datos obligatorios"})
        }

        const nuevo = this.ciudadService.create(ciudad)

        if(!nuevo) {
            return res.status(409).json({ error: "Ciudad ya existente"})
        }

        res.status(201).json(nuevo);
    }
}