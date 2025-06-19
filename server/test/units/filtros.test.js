import { Alojamiento } from "../../birbnb/models/entities/Alojamiento.js";
import { Direccion } from "../../birbnb/models/entities/Direccion.js";
import { Ciudad } from "../../birbnb/models/entities/Ciudad.js";
import { Caracteristica } from "../../birbnb/models/entities/enums/Caracteristica.js";
import { Filtro } from "../../birbnb/models/entities/Filtro.js";
import { RangoFechas } from "../../birbnb/models/entities/RangoFechas.js";

describe("Tests de Filtros", () => {
    const aloj = new Alojamiento(null, null, null, 1000, null, null, null, new Direccion(null, null, new Ciudad("CABA", null)), 5, [Caracteristica.WIFI, Caracteristica.PILETA], null)
    aloj.agregarFechasReserva(new RangoFechas(new Date(2025,6,18), new Date(2025,6,24)))

    test("Filtro por Ciudad", () => {
        const filtroCiudad = new Filtro(new Ciudad("CABA", null))

        expect(filtroCiudad.validarCiudad(aloj, new Ciudad("CABA", null))).toBe(true)
        expect(filtroCiudad.validarCiudad(aloj, null)).toBe(true)
    })

    test("Filtro por Cantidad de Huespedes", () => {
        const filtroCantHuespedes = new Filtro(null, null, 5)

        expect(filtroCantHuespedes.validarCantidadHuespedes(aloj, 5)).toBe(true)
        expect(filtroCantHuespedes.validarCantidadHuespedes(aloj, null)).toBe(true)
    })

    test("Filtro por Fechas", () => {
        const fechaInicio = new Date(2025, 6, 10)
        const fechaFinBuena = new Date(2025, 6, 16)
        const fechaFinMala = new Date(2025, 6, 20)
        const filtroFechasBuena = new Filtro(null, null, null, null, null, fechaInicio, fechaFinBuena)
        const filtroFechasMala = new Filtro(null, null, null, null, null, fechaInicio, fechaFinMala)

        expect(filtroFechasBuena.validarFechas(aloj, fechaInicio, fechaFinBuena)).toBe(true)
        expect(filtroFechasMala.validarFechas(aloj, fechaInicio, fechaFinMala)).toBe(false)
        expect(filtroFechasBuena.validarFechas(aloj, null, null)).toBe(true)
    })

    test("Filtro por Precio", () => {
        const filtroPrecio = new Filtro(null, null, null, 500, 1500)

        expect(filtroPrecio.validarPrecio(aloj, 500, 1500)).toBe(true)
        expect(filtroPrecio.validarPrecio(aloj, null, null)).toBe(true)
    })

    test("Filtro por Caracteristicas", () => {
        const filtroCaracteristicas = new Filtro(null, null, null, null, null, null, null, [Caracteristica.WIFI, Caracteristica.PILETA])

        expect(filtroCaracteristicas.validarCaracteristicas(aloj, [Caracteristica.WIFI, Caracteristica.PILETA])).toBe(true)
        expect(filtroCaracteristicas.validarCaracteristicas(aloj, null)).toBe(true)
    })

    test("Filtro por Varios Campos", () => {
        const filtro = new Filtro(
            new Ciudad("CABA", null),
            null,
            5,
            500,
            1500,
            new Date(2025, 6, 10),
            new Date(2025, 6, 16),
            [Caracteristica.WIFI, Caracteristica.PILETA]
        )

        expect(filtro.cumplenCon([aloj])).toEqual([aloj])
    })
})