import { ReservaModel } from "../schemas/reservaSchema.js"

export class ReservaRepository {
    constructor() {
        this.model = ReservaModel
    }

    async countAll() {
        return await this.model.countDocuments()
    }

    async save(reserva) {
        if(reserva.id) {
            const { id, ...datosActualizados } = reserva
            const reservaExistente = await this.model.findByIdAndUpdate(
                id,
                datosActualizados,
                { new: true , runValidators: true }
            )
            return await this.model.populate(reservaExistente, [
                { path: 'huespedReservador'},
                {
                    path: 'alojamiento',
                    populate: [
                        {path: 'anfitrion'},
                        {
                            path: 'direccion.ciudad',
                            populate: {path: 'pais'}
                        }
                    ]
                }
            ])
        } else {
            const nuevaReserva = new this.model(reserva)
            const reservaGuardada = await nuevaReserva.save()
            return await this.model.populate(reservaGuardada, [
                { path: 'huespedReservador'},
                {
                    path: 'alojamiento',
                    populate: [
                        {path: 'anfitrion'},
                        {
                            path: 'direccion.ciudad',
                            populate: {path: 'pais'}
                        }
                    ]
                }
            ])
        }
    }

    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id)
        return resultado !== null
    }

    async findByPage(pageNum, limitNum) {
        const skip = (pageNum - 1) * limitNum
        const reservas = await this.model.find()
            .skip(skip)
            .limit(limitNum)
            .populate('huespedReservador')
            .populate({
                path: 'alojamiento',
                populate: [
                    {path: 'anfitrion'},
                    {
                        path: 'direccion.ciudad',
                        populate: {path: 'pais'}
                    }
                ]
            })
        return reservas
    }

    async findAll() {
        return await this.model.find()
            .populate('huespedReservador')
            .populate({
                path: 'alojamiento',
                populate: [
                    {path: 'anfitrion'},
                    {
                        path: 'direccion.ciudad',
                        populate: {path: 'pais'}
                    }
                ]
            })
    }

    async findById(id) {
        return await this.model.findById(id)
            .populate('huespedReservador')
            .populate({
                path: 'alojamiento',
                populate: [
                    {path: 'anfitrion'},
                    {
                        path: 'direccion.ciudad',
                        populate: {path: 'pais'}
                    }
                ]
            })
    }

    async findByAlojamiento(alojamiento) {
        return await this.model.find({ alojamiento })
            .populate('huespedReservador')
            .populate({
                path: 'alojamiento',
                populate: [
                    {path: 'anfitrion'},
                    {
                        path: 'direccion.ciudad',
                        populate: {path: 'pais'}
                    }
                ]
            })
    }

    async findByUsuario(pageNum, limitNum, huespedReservador ) {
        const skip = (pageNum - 1) * limitNum
        return await this.model.find({ huespedReservador })
            .skip(skip)
            .limit(limitNum)
            .populate('huespedReservador')
            .populate({
                path: 'alojamiento',
                populate: [
                    { path: 'anfitrion' },
                    {
                        path: 'direccion.ciudad',
                        populate: { path: 'pais' }
                    }
                ]
            })
    }

}