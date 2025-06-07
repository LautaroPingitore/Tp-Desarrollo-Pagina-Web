import { Alojamiento } from "../../birbnb/models/entities/Alojamiento";
import { Direccion } from "../../birbnb/models/entities/Direccion";
import { Ciudad } from "../../birbnb/models/entities/Ciudad";
import { Caracteristica } from "../../birbnb/models/entities/enums/Caracteristica";
import { Filtro } from "../../birbnb/models/entities/Filtro";

describe("Tests de Filtros", () => {
    const aloj = new Alojamiento(null, null, null, 1000, null, null, null, new Direccion(null, null, new Ciudad("CABA", null)), 5, [Caracteristica.WIFI, Caracteristica.PISCINA], null)

    test("Filtro por Ciudad", () => {
        const filtroCiudad = new Filtro({ciudad: new Ciudad("CABA", null)})

        expect(filtroCiudad.validarCiudad(aloj, new Ciudad("CABA", null))).toBe(true)
        expect(filtroCiudad.validarCiudad(aloj, null)).toBe(true)
    })

    test("Filtro por Cantidad de Huespedes", () => {
        const filtroCantHuespedes = new Filtro({cantHuespedes: 5})

        expect(filtroCantHuespedes.validarCantidadHuespedes(aloj, 5)).toBe(true)
        expect(filtroCantHuespedes.validarCantidadHuespedes(aloj, null)).toBe(true)
    })

    test("Filtro por Fechas", () => {
        const filtroFechas = new Filtro({fechaInicio: new Date(2023, 10, 3), fechaFin: new Date(2023, 10, 6)})
        const fechaInicio = new Date(2023, 10, 3)
        const fechaFin = new Date(2023, 10, 6)

        expect(filtroFechas.validarFechas(aloj, fechaInicio, fechaFin)).toBe(true)
        expect(filtroFechas.validarFechas(aloj, null, null)).toBe(true)
    })

    test("Filtro por Precio", () => {
        const filtroPrecio = new Filtro({precioMin: 500, precioMax: 1500})

        expect(filtroPrecio.validarPrecio(aloj, 500, 1500)).toBe(true)
        expect(filtroPrecio.validarPrecio(aloj, null, null)).toBe(true)
    })

    test("Filtro por Caracteristicas", () => {
        const filtroCaracteristicas = new Filtro({caracteristicas: [Caracteristica.WIFI, Caracteristica.PISCINA]})

        expect(filtroCaracteristicas.validarCaracteristicas(aloj, [Caracteristica.WIFI, Caracteristica.PISCINA])).toBe(true)
        expect(filtroCaracteristicas.validarCaracteristicas(aloj, null)).toBe(true)
    })

    test("Filtro por Varios Campos", () => {
        const filtro = new Filtro({
            ciudad: new Ciudad("CABA", null),
            cantHuespedes: 5,
            fechaInicio: new Date(2023, 10, 3),
            fechaFin: new Date(2023, 10, 6),
            precioMin: 500,
            precioMax: 1500,
            caracteristicas: [Caracteristica.WIFI, Caracteristica.PISCINA]
        })

        expect(filtro.cumplenCon([aloj])).toEqual([aloj])
    })
})