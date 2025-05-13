import { AnfitrionModel } from "../schemas/anfitrionSchema"

export class AnfitrionRepository {
    constructor() {
        this.model = AnfitrionModel
    }

    async save(anfitrion) {
        if(anfitrion.id) {
            const { id, ...datosActualizados } = anfitrionExistente
            const anfitrionExistente = await this.model.findByIdAndUpdate(
                anfitrion.id,
                datosActualizados,
                { new: true, runValidators: true }
            )
            return anfitrionExistente
        } else {
            const newAnfitrion = new this.model(anfitrion)
            const anfitrionGuardado = await newAnfitrion.save()
            return anfitrionGuardado
        }
    }

    async deleteById(id) {
        const resultado = await this.anfitriones.findByIdAndDelete(id)
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
        const anfitriones = await this.model.find()
            .skip(skip)
            .limit(limitNum)
            .exec()
        return anfitriones
    }

    async countAll() {
        return await this.model.countDocuments()
    }
}