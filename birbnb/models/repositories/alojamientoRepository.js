export class AlojamientoRepository {
    constructor() {
        this.alojamientos = [];
        this.nextId = 0;
    }

    countAll() {
        const alojamientos = this.findAll();
        return alojamientos.length;
    }

    save(alojamiento) {
        alojamiento.id = this.nextId++;
        this.alojamientos.push(alojamiento);
        return alojamiento;
    }

    deleteById(id) {
        const index = this.alojamientos.findIndex(p => p.id == id);
        if(id == -1) return false;
        this.alojamientos.splice(index, 1);
        return true;
    }

    findByPage(pageNum, limitNum) {
        const alojamientos = this.findAll();
        const offset = (pageNum - 1) * limitNum;
        return alojamientos.splice(offset, offset + limitNum);
    }

    findAll() {
        return this.alojamientos;
    }

    findById(id) {
        return this.alojamientos.find(p => p.id === id);
    }

    findByFilters(filtro, {pageNum, limitNum}) {
        let filtrados = filtro.cumplenCon(this.alojamientos);
        const offset = (pageNum - 1) * limitNum;
        return filtrados.slice(offset, offset + limitNum);
    }

    findByName(nombre) {
        return this.alojamientos.find(p => p.nombre === nombre);
    }
}