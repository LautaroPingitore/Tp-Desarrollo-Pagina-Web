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
                id,
                datosActualizados,
                { new: true , runValidators: true }
            )
            return await this.model.populate(alojamientoExistente, [
                { path: 'anfitrion'},
                { 
                    path: 'direccion.ciudad',
                    populate: { path: 'pais' }
                }
            ])
        } else {
            const nuevoAlojamiento = new this.model(alojamiento)
            const alojamientoGuardado = await nuevoAlojamiento.save()
            return await this.model.populate(alojamientoGuardado, [
                { path: 'anfitrion'},
                { 
                    path: 'direccion.ciudad',
                    populate: { path: 'pais' }
                }
            ])
        }

    }

    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id)
        return resultado !== null
    }


    async findByPage(pageNum, limitNum){
        const skip = (pageNum - 1) * limitNum
        const alojamientos = await this.model.find()
            .skip(skip)
            .limit(limitNum)
            .populate('anfitrion')
            .populate({
                path: 'direccion.ciudad',
                populate: {path: 'pais'}
            })
        return alojamientos
    }

   async findByFilters(filtro) {
        
        const query = {}

        if(filtro.precioMax != null) {
            query.precioPorNoche = {}
            query.precioPorNoche.$lte = filtro.precioMax
        }
        
        if(filtro.precioMin != null) {
            query.precioPorNoche.$gte = filtro.precioMin
        }

        if(filtro.cantHuespedes != null) {
            query.cantHuespedesMax = { $gte: filtro.cantHuespedes}
        }

        if(filtro.caracteristicas && filtro.caracteristicas.length > 0) {
            query.caracteristicas = { $all: filtro.caracteristicas }
        }

        const resultadosFiltro1 = await this.model.find(query)
            .populate('anfitrion')
            .populate({
                path: 'direccion.ciudad',
                populate: {path: 'pais'}
            })

        return resultadosFiltro1.filter(r => {
            const ciudad = r.direccion?.ciudad
            const pais = ciudad?.pais

            const coincideCiudad = filtro.ciudad ? ciudad?.nombre === filtro.ciudad : true
            const coincidePais = filtro.pais ? pais?.nombre === filtro.pais : true

            return coincideCiudad && coincidePais
        })

    }

    async findById(id) {
        return await this.model.findById(id)
            .populate('anfitrion')
            .populate({
                path: 'direccion.ciudad',
                populate: {path: 'pais'}
            })
    }

    async findByName(nombre) {
        return await this.model.findOne({nombre})
            .populate('anfitrion')
            .populate({
                path: 'direccion.ciudad',
                populate: {path: 'pais'}
            })
    }
}