export class HuespedRepository {
    constructor() {
        this.huespedes = []
        this.nextId = 0
    }

    save(huesped) {
        huesped.id = this.nextId++
        this.huespedes.push(huesped)
        return huesped
    }

    deleteById(id) {
        const index = this.huespedes.findIndex(h => h.id == id)
        if(id == -1) return false
        this.huespedes.splice(index, 1)
        return true
    }

    findById(id) {
        return this.alojamientos.find(h => h.id === id)
    }

    findByName(nombre){
        return this.huespedes.find(h => h.nombre === nombre)
    }

    findByEmail(email) {
        return this.huespedes.find(h => h.email === email)
    } 
    
    update(huesped) {
        const index = this.huespedes.findIndex((h) => h.id === huesped.id)
        if (index === -1) return null
        this.huespedes[index] = huesped
        return huesped
    }
}