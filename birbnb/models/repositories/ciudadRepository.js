import { CiudadModel } from "../schemas/ciudadSchema.js"

export class CiudadRepository {
    constructor() {
        this.model = CiudadModel
    }

    async save(ciudad) {
        if(ciudad.id) {
            const { id, ...datosActualizados } = ciudad
            const ciudadExistente = await this.model.findByIdAndUpdate(
                ciudad.id,
                datosActualizados,
                { new: true , runValidators: true}
            )
            return ciudadExistente.populate('pais')
        } else {
            const nuevaCiudad = new this.model(ciudad)
            const ciudadGuardada = await nuevaCiudad.save()
            return ciudadGuardada.populate('pais')
        }
    }

    async findById(id) {
        return await this.model.findById(id).populate('pais')
    }
    
    async findByName(nombre) {
        return await this.model.findOne({nombre}).populate('pais')
    }

    async findByPais(idPais) {
        return await this.model.find({pais : idPais}).populate('pais')
    }

    async findByPage(pageNum, limitNum) {
        return await this.model.findByPage(pageNum, limitNum).populate('pais')
    }

    async countAll() {
        return await this.model.countDocuments()
    }
}