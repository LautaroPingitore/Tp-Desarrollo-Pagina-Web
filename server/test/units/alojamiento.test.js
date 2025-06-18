import { Alojamiento } from "../../birbnb/models/entities/Alojamiento.js";
import { RangoFechas } from "../../birbnb/models/entities/RangoFechas.js";
import { Reserva } from "../../birbnb/models/entities/Reserva.js";

describe("Tests de Requisitos Reserva", () => {
    const alojamiento = new Alojamiento(null, null, null, 1000, null, null, null, null, 5, null, null)
    alojamiento.agregarFechasReserva(new RangoFechas(new Date(2025,6,10), new Date(2025,6,20)))
    

    test("El alojamiento puede reservarse en x rango de fechas", () => {
        const rangoFechaTrue = new RangoFechas(new Date(2025, 6, 3), new Date(2025, 6, 9));
        const rangoFechaFalse = new RangoFechas(new Date(2025, 6, 5), new Date(2025, 6, 22));

        expect(alojamiento.estasDisponibleEn(rangoFechaTrue)).toBe(true)
        expect(alojamiento.estasDisponibleEn(rangoFechaFalse)).toBe(false)
    })

    test("El alojamiento puede reservarse por $1500", () => {
        const precioMinTrue = 500
        const precioMaxTrue = 1500

        const precioMaxFalse = 500

        expect(alojamiento.tuPrecioEstaDentroDe(precioMinTrue, precioMaxTrue)).toBe(true)
        expect(alojamiento.tuPrecioEstaDentroDe(null, precioMaxFalse)).toBe(false)
    })

    test("El alojamiento puede reservarse para 2 personas", () => {
        expect(alojamiento.puedenAlojarse(2)).toBe(true)
        expect(alojamiento.puedenAlojarse(6)).toBe(false)
    })
})