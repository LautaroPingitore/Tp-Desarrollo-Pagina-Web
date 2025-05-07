export class PaisRepository {
    constructor() {
        this.paises = []
    }

    save(pais) {
        this.paises.push(pais)
        return pais
    }

    findByName(nombre) {
        return this.paises.find(p => p.nombre === nombre)
    }

    // Se puede sacar si no queres ver todos los paises
    findByPage(pageNum, limitNum) {
        const offset = (pageNum - 1) * limitNum
        return this.paises.slice(offset, offset + limitNum)
    }

    countAll() {
        return this.paises.length
    }
}