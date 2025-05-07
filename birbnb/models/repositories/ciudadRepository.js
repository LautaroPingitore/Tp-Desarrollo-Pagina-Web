export class CiudadRepository {
    constructor() {
        this.ciudades = []
        this.nextId = 0
    }

    save(ciudad) {
        ciudad.id = this.nextId++
        this.ciudades.push(ciudad)
        return ciudad
    }

    findById(id) {
        return this.ciudades.find(c => c.id === id)
    }
    
    findByName(nombre) {
        return this.ciudades.find(c => c.nombre === nombre)
    }

    findByPais(pais) {
        return this.ciudades.filter(c => c.pais === pais)
    }

    findByPage(pageNum, limitNum) {
        const offset = (pageNum - 1) * limitNum
        return this.ciudades.slice(offset, offset + limitNum)
    }

    countAll() {
        return this.ciudades.length
    }
}