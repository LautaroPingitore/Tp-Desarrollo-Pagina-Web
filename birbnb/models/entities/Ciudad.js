export class Ciudad {
  #id

  constructor(nombre, pais) {
    this.nombre = nombre;
    this.pais = pais;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }
}