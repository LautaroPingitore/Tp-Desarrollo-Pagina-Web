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
        const index = this.huespedes.findIndex(a => a.id === id)
        if(index == -1) return false
        this.huespedes.splice(index, 1)
        return true
    }

    findById(id) {
        return this.huespedes.find(a => a.id === id)
    }

    findByName(nombre){
        return this.huespedes.find(a => a.nombre === nombre)
    }

    findByEmail(email) {
        return this.huespedes.find(a => a.email === email)
    } 

    findByPage(pageNum, limitNum) {
        const offset = (pageNum - 1) * limitNum
        return this.huespedes.slice(offset, offset + limitNum)
    }

    countAll() {
        return this.huespedes.length
    }
    
    update(huesped) {
        const index = this.huespedes.findIndex(a => a.id === huesped.id)
        if (index === -1) return null
        this.huespedes[index] = huesped
        return huesped
    }
}