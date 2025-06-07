import { PaisModel } from "../schemas/paisShema.js"

export class PaisRepository {
    constructor() {
        this.model = PaisModel
    }

    async save(pais) {
        if(pais.id) {
            const paisExistente = await this.model.findByIdAndUpdate(
                pais.id,
                pais.nombre,
                { new: true, runValidators: true}
            )
            return paisExistente
        } else {
            const nuevoPais = new this.model(pais)
            const paisGuardadao = await nuevoPais.save()
            return paisGuardadao
        }
    }

    async findByName(nombre) {
        return await this.model.findOne({nombre})
    }

    async findByPage(pageNum, limitNum) {
        return await this.model.findByPage(pageNum, limitNum)
    }

    async countAll() {
        return await this.model.countDocuments()
    }
}