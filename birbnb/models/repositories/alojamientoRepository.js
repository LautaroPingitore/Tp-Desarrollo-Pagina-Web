export class AlojamientoRepository {
    constructor() {
        this.alojamientos = [];
        this.nextId = 0;
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

    findAll() {
        return this.alojamientos;
    }

    findById(id) {
        return this.alojamientos.find(p => p.id === id);
    }

    findByFilters(filtro) {
        return filtro.cumplenCon(this.alojamientos);
    }

    findByName(nombre) {
        return this.productos.find(p => p.nombre === nombre);
    }
}