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
            const alojamientoExistente = await this.model.findByIdAndUpdate(
                alojamiento.id,
                alojamiento,
                { new: true , runValidators: true }
            )
            return alojamientoExistente
        } else {
            const nuevoAlojamiento = new this.model(alojamiento)
            const alojamientoGuardado = await nuevoAlojamiento.save()
            return alojamientoGuardado
        }

    }

    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id)
        return resultado !== null
    }


    async findByPage(pageNum,limitNum){
        const alojamientos = await this.model.findByPage(pageNum, limitNum)
        return alojamientos;
    }

    async findById(id) {
        return await this.model.findById(id);
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

        return await this.model.find(query);

    }

    async findByName(nombre) {
        return await this.model.findByName(nombre)
    }
}