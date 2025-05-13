export class Pais {
  #id

  constructor(nombre) {
    this.nombre = nombre;
  }

  get id() {
    return this.#id
  }

  set id(id) {
    this.#id = id
  }
}