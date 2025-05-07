export class AnfitrionRepository {
    constructor() {
        this.anfitriones = []
        this.nextId = 0
    }

    save(anfitrion) {
        anfitrion.id = this.nextId++
        this.anfitriones.push(anfitrion)
        return anfitrion
    }

    deleteById(id) {
        const index = this.anfitriones.findIndex(a => a.id === id)
        if(index == -1) return false
        this.anfitriones.splice(index, 1)
        return true
    }

    findById(id) {
        return this.anfitriones.find(a => a.id === id)
    }

    findByName(nombre){
        return this.anfitriones.find(a => a.nombre === nombre)
    }

    findByEmail(email) {
        return this.anfitriones.find(a => a.email === email)
    } 

    findByPage(pageNum, limitNum) {
        const offset = (pageNum - 1) * limitNum
        return this.anfitriones.slice(offset, offset + limitNum)
    }

    countAll() {
        return this.anfitriones.length
    }
    
    update(anfitrion) {
        const index = this.anfitriones.findIndex(a => a.id === anfitrion.id)
        if (index === -1) return null
        this.anfitriones[index] = anfitrion
        return anfitrion
    }
}