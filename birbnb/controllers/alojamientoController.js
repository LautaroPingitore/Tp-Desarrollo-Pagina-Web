export class AlojamientoController {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    findAll = (req, res) => {
        const alojamientos = this.alojamientoService.findAll();
        res.json(alojamientos);
    };

    findById = (req, res) => {
        const id = Number(req.params.id);
        const alojamiento = this.alojamientoService.findById(id);
        if(!alojamiento) {
            return res.status(404).json({ error: "Alojamiento no encontrado"});
        }
        res.json(alojamiento);
    };

    findByFilter = (req, res) => {
        // TODO
    }

    create = (req, res) => {
        const alojamiento = req.body;
        const { anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, reservas, fotos} = alojamiento;

        // Verificar datos

        const nuevo = this.alojamientoService.create(alojamiento);
        if(!nuevo) {
            return res.status(409).json({ error: "Alojamiento ya existente"});
        }

        res.status(201).json(nuevo);
    }

    delete = (req, res) => {
        const id = Number(req.params.id);
        const eliminado = this.alojamientoService.delete(id);
        if (!eliminado) {
          return res.status(404).json({ error: "Alojamiento no encontrado" });
        }
        res.status(204).send();
    };
}