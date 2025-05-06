export class ReservaRepository {
    constructor() {
        this.reservas = []
        this.nextId = 0
    }

    countAll() {
        return this.reservas.length
    }

    save(reserva) {
        reserva.id = this.nextId++
        this.reservas.push(reserva)
        return reserva
    }

    deleteById(id) {
        const index = this.reservas.findIndex(r => r.id == id);
        if(id == -1) return false;
        this.reservas.splice(index, 1);
        return true;
    }

    findByPage(pageNum, limitNum) {
        const reservas = this.findAll();
        const offset = (pageNum - 1) * limitNum;
        return reservas.splice(offset, offset + limitNum);
    }

    findAll() {
        return this.reservas;
    }

    findById(id) {
        return this.reservas.find(r => r.id === id);
    }

    update(reserva) {
        const index = this.reservas.findIndex(r => r.id === reserva.id)
        if (index === -1) return null
        this.reservas[index] = reserva
        return reserva
    }

}