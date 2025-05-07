export class AnfitrionController {
    constructor(anfitrionService) {
        this.anfitrionService = anfitrionService
    }

    findAll = (req, res) => {
        const { page, limit } = req.query
        const anfitrion = this.anfitrionService.findAll({ page, limit })
        res.json(anfitrion)
    }

    create = (req, res) => {
        const anfitrion = req.body
        const { nombre, email } = anfitrion

        if(!nombre || !email) {
            return res.status(400).json({ error: "Faltan datos obligatorios"})
        }

        const nuevo = this.anfitrionService.create(anfitrion)

        if(!nuevo) {
            return res.status(409).json({ error: "anfitrion ya existente"})
        }

        res.status(201).json(nuevo);
    } 

    delete = (req, res) => {
        const id = Number(req.params.id)
        const eliminado = this.anfitrionService.delete(id)

        if(!eliminado) return res.status(404).json({ error: "Anfitrion no encontrado"})
        return res.status(204).send()
    }

    update = (req, res) => {
        const id = Number(req.params.id)
        const { nombre, email } = req.body
    
        const actualizado = this.anfitrionService.update(id, {nombre, email})
    
        if (actualizado.error === "not-found") {
          return res.status(404).json({ error: "Anfitrion no encontrado" })
        }
    
        if (actualizado.error === "name-duplicated") {
          return res.status(409).json({ error: "Nombre en uso por otro anfitrion" })
        }

        if (actualizado.error === "email-duplicated") {
            return res.status(409).json({ error: "Email en uso por otro anfitrion" })
        }
    
        res.json(actualizado)
    }
}