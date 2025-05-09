export class AlojamientoController {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    // Endpoint alojamientos disponibles
    findAll = (req, res) => {
        const { page = 1, limit = 10} = req.query;
        const alojamientos = this.alojamientoService.findAll({page, limit});
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

    // Endpoint para buscar alojamientos por filtros
    findByFilter = (req, res) => {
        const { page = 1, limit = 10} = req.query;
        const filtro = req.query;
        const alojamientos = this.alojamientoService.findByFilters(filtro, {page, limit});
        if(!alojamientos) {
            return res.status(404).json({ error: "No se encontraron alojamientos"});
        }
        res.json(alojamientos);
    }

    // Endpoint para crear un nuevo alojamiento
    create = (req, res) => {
        const alojamiento = req.body;
        const { anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, fotos } = alojamiento;

        if(!anfitrion || !nombre || !descripcion || !precioPorNoche || !moneda || !horarioCheckIn || !horarioCheckOut || !direccion || !cantHuespedesMax || !caracteristicas || !fotos) {
            return res.status(400).json({ error: "Faltan datos obligatorios"});
        }

        const nuevo = this.alojamientoService.create(alojamiento);
        if(!nuevo) {
            return res.status(409).json({ error: "Alojamiento ya existente"});
        }

        res.status(201).json(nuevo);
    }

    // Endpoint para eliminar un alojamiento
    delete = (req, res) => {
        const id = Number(req.params.id);
        const eliminado = this.alojamientoService.delete(id);
        if (!eliminado) {
          return res.status(404).json({ error: "Alojamiento no encontrado" });
        }
        res.status(204).send();
    };
}