import { AlojamientoModel } from '../schemas/alojamientoSchema.js';

export class AlojamientoRepository {
    constructor() {
        this.model = AlojamientoModel
    }

    async countAll() {
        return await this.model.countDocuments()
    }

    async save(alojamiento) {
        if(alojamiento.id) {
            const { id, ...datosActualizados } = alojamiento
            const alojamientoExistente = await this.model.findByIdAndUpdate(
                alojamiento.id,
                datosActualizados,
                { new: true , runValidators: true }
            )
            return alojamientoExistente.populate('anfitrion').populate('direccion.ciudad').populate('direccion.ciudad.pais')
        } else {
            const nuevoAlojamiento = new this.model(alojamiento)
            const alojamientoGuardado = await nuevoAlojamiento.save()
            return alojamientoGuardado.populate('anfitrion').populate('direccion.ciudad').populate('direccion.ciudad.pais')
        }

    }

    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id)
        return resultado !== null
    }


    async findByPage(pageNum,limitNum){
        const alojamientos = await this.model.findByPage(pageNum, limitNum).populate('anfitrion').populate('direccion.ciudad').populate('direccion.ciudad.pais')
        return alojamientos;
    }

    async findById(id) {
        return await this.model.findById(id).populate('anfitrion').populate('direccion.ciudad').populate('direccion.ciudad.pais');
    }

   async findByFilters(filtro) {
        
        const query = {};

        if (filtro.ciudad) {
            query.filtro.ciudad = { $regex: filtro.ciudad, $options: 'i' };
        }
        if (filtro.pais) {
            query.filtro.pais = { $regex: filtro.pais, $options: 'i' };
        }
        if (filtro.cantHuespedes) {
            query.filtro.cantHuespedes = { $gte: filtro.cantHuespedes };
        }
        if (filtro.fechaInicio) {
            query.filtro.fechaInicio = { $gte: new Date(filtro.fechaInicio) };
        }
        if (filtro.fechaFin) {
            query.filtro.fechaFin = { $lte: new Date(filtro.fechaFin) };
        }
        if (filtro.precioMin) {
            query.filtro.precioMin = { $gte: filtro.precioMin };
        }
        if (filtro.precioMax) {
            query.filtro.precioMax = { $lte: filtro.precioMax };
        }
        if (filtro.caracteristicas && filtro.caracteristicas.length > 0) {
            query.filtro.caracteristicas = { $in: filtro.caracteristicas };
        }        

        return await this.model.find(query).populate('anfitrion').populate('direccion.ciudad').populate('direccion.ciudad.pais');

    }

    async findByName(nombre) {
        return await this.model.findOne({nombre}).populate('anfitrion').populate('direccion.ciudad').populate('direccion.ciudad.pais')
    }
}