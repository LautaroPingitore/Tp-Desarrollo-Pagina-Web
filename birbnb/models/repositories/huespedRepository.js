import { HuespedModel } from "../schemas/huespedSchema.js"

export class HuespedRepository {
    constructor() {
        this.model = HuespedModel
    }

    async save(huesped) {
        if(huesped.id) {
            const { id, ...datosActualizados } = huesped
            const huespedExistente = await this.model.findByIdAndUpdate(
                huesped.id,
                datosActualizados,
                { new: true, runValidators: true }
            )
            return huespedExistente
        } else {
            const newhuesped = new this.model(huesped)
            const huespedGuardado = await newhuesped.save()
            return huespedGuardado
        }
    }

    async deleteById(id) {
        const resultado = await this.huespedes.findByIdAndDelete(id)
        return resultado !== null
    }

    async findById(id) {
        return await this.model.findById(id)
    }

    async findByName(nombre){
        return await this.model.findOne({nombre})
    }

    async findByEmail(email) {
        return await this.model.findOne({ email })
    } 

    async findByPage(pageNum, limitNum) {
        const skip = (pageNum - 1) * limitNum
        const huespedes = await this.model.find()
            .skip(skip)
            .limit(limitNum)
            .exec()
        return huespedes
    }

    async countAll() {
        return await this.model.countDocuments()
    }
}