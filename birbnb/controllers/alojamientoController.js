import { Filtro } from "../models/entities/Filtro.js";

export class AlojamientoController {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    // Endpoint alojamientos disponibles
    async findAll(req, res, next){
        try {
            const { page = 1, limit = 10} = req.query
            if(req.body != null) {
                const { ciudad=null, pais=null, cantidadHuespedes=null, precioMin=null, precioMax=null, caracteristicas=[]} = req.body
            }
            
            const hasFilters = req.body && Object.values(req.body).some(value => value !== null && 
                value !== undefined 
                && !(Array.isArray(value) 
                && value.length === 0
            ))

            let alojamientos
            if(hasFilters) {
                const filtro = new Filtro(ciudad, pais, cantidadHuespedes, precioMin, precioMax, caracteristicas)
                alojamientos = await this.alojamientoService.findByFilters(filtro, {page, limit});
            } else {
                alojamientos = await this.alojamientoService.findAll({ page, limit })
            }

            res.json(alojamientos);
        } catch (error) {
            next(error)
        }
    };

    async findById (req, res) {
        try{
            const id = Number(req.params.id);
            const alojamiento = await this.alojamientoService.findById(id);

            res.json(alojamiento);
        } catch (error) {
            next(error)
        }
    };

    // Endpoint para buscar alojamientos por filtros
    async findByFilter(req, res, next){
        try{
            const { page = 1, limit = 10} = req.query;
            const filtro = req.query;
            const alojamientos = await this.alojamientoService.findByFilters(filtro, {page, limit});

            res.json(alojamientos);
        } catch (error) {
            next(error)
        }
    };

    // Endpoint para crear un nuevo alojamiento
    async create (req, res,next) {
        try {
            const alojamiento = req.body;
            const nuevo = await this.alojamientoService.create(alojamiento);

            res.status(201).json(nuevo);
        } catch (error) {
            next(error)
        }
    }

    // Endpoint para eliminar un alojamiento
    async delete(req, res, next) {
    try {
      await this.alojamientoService.delete(req.params.id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}