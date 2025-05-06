export class HuespedController {
    constructor(huespedService) {
        this.huespedService = huespedService
    }

    create = (req, res) => {
        const huesped = req.body
        const { nombre, email } = huesped

        if(!nombre || !email) {
            return res.status(400).json({ error: "Faltan datos obligatorios"})
        }

        const nuevo = this.huespedService.create(huesped)

        if(!nuevo) {
            return res.status(409).json({ error: "Huesped ya existente"})
        }

        res.status(201).json(nuevo);
    } 

    delete = (req, res) => {
        const id = Number(req.params.id)
        const eliminado =this.huespedService.delete(id)

        if(!eliminado) return res.status(404).json({ error: "Huesped no encontrado"})
        return res.status(204).send()
    }

    update = (req, res) => {
        const id = Number(req.params.id)
        const { nombre, email } = req.body
    
        const actualizado = this.productService.update(id, {nombre,email})
    
        if (actualizado.error === "not-found") {
          return res.status(404).json({ error: "Producto no encontrado" })
        }
    
        if (actualizado.error === "name-duplicated") {
          return res.status(409).json({ error: "Nombre en uso por otro huesped" })
        }

        if (actualizado.error === "email-duplicated") {
            return res.status(409).json({ error: "Email en uso por otro huesped" })
        }
    
        res.json(actualizado)
    }
}