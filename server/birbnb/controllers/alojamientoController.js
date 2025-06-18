import { Filtro } from "../models/entities/Filtro.js";

export class AlojamientoController {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    async findAll(req, res, next){
        try {
            const { page = 1, limit = 10} = req.query
            const paginacion = { page, limit}

            const {ciudad=null, pais=null, cantidadHuespedes=null, precioMin=null, precioMax=null, fechaInicio=null, fechaFin=null, caracteristicas=[]} = req.query
            const filtros = {ciudad, pais, cantidadHuespedes, precioMin, precioMax, fechaInicio, fechaFin, caracteristicas}
            
            const hasFilters = Object.values(filtros).some(value => value !== null && value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true));
            
            let alojamientos
            if(hasFilters) {
                const filtro = new Filtro(ciudad, pais, cantidadHuespedes, precioMin, precioMax, fechaInicio, fechaFin, caracteristicas)
                alojamientos = await this.alojamientoService.findByFilters(filtro, {page, limit});
            } else {
                alojamientos = await this.alojamientoService.findAll({ page, limit })
            }

            res.json(alojamientos);
        } catch (error) {
            next(error)
        }
    };

    async findById (req, res, next) {
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

            debugger
            console.log("dsadasdasda", filtro);

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

    async importArray(req, res, next) {
        try {
            let array = req.body
            
            if (!Array.isArray(array)) {
            if (typeof array === 'object' && array !== null) {
                array = [array];
            } else {
                throw new Error("El cuerpo debe ser un array o un objeto");
            }
        }

            for(const a of array) {
                await this.alojamientoService.create(a)
            }

            res.status(200).send({message: `Importación completa. ${array.length} documentos insertados.`})
        } catch (error) {
            next(error)
        }
    }
}