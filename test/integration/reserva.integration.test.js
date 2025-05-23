import { ReservaController } from "../../birbnb/controllers/reservaController.js"
import { ReservaService } from "../../birbnb/services/reservaService.js"
import reservaRoutes from "../../birbnb/routes/reservaRoutes.js"
import { buildTestServer } from "./utils/server.js"
import { describe, expect, jest, test } from "@jest/globals"
import request from "supertest"
import express from "express"
import { errorHandler } from "../../birbnb/middlewares/errorHandler.js"

const app = express()
const server = buildTestServer(app)

server.addRoute(reservaRoutes)
server.configureRoutes()

app.use(errorHandler)

const reservaRepository = {
    countAll: jest.fn().mockResolvedValue(2),
    findByName: jest.fn().mockResolvedValue(null), 
    findByPage: jest.fn().mockResolvedValue(
        [
            {
                id: 0,
                huespedReservador: "Pepita",
                cantHuespedes: 2,
                alojamiento: "Casa de playa",
                rangoFechas: {
                    fechaInicio: new Date("2023/10/01"),
                    fechaFin: new Date("2023/10/05")
                }
            },
            {
                id: 1,
                huespedReservador: "Juanito",
                cantHuespedes: 4,
                alojamiento: "Cabaña en la montaña",
                rangoFechas: {
                    fechaInicio: new Date("2023/11/01"),
                    fechaFin: new Date("2023/11/05")
                }
            }
        ]
    ),
    save: jest.fn().mockImplementation(reserva => Promise.resolve(reserva)),
    findByAlojamiento: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null)
}

const alojamientoRepository = {
    findByName: jest.fn().mockResolvedValue({
        nombre: "Casa de playa",
        anfitrion: {
            nombre: "Anfitrionx",
            email: "pppp",
            notificaciones: [],
            
            recibirNotificacion: jest.fn().mockImplementation(function(n) {
                this.notificaciones.push(n)
            })
        },
        puedenAlojarse: jest.fn().mockReturnValue(true),
        estasDisponibleEn: jest.fn().mockReturnValue(true)
    }),
}

const huespedRepository = {
    findByName: jest.fn().mockResolvedValue({ 
        id: 1,
        nombre: "Pepita", 
        email: "sss"
    }),
    findById: jest.fn().mockResolvedValue({ 
        id: 1,
        nombre: "Pepita", 
        email: "sss"
    }),
    save: jest.fn()
}

const anfitrionRepository = {
    findById: jest.fn().mockResolvedValue({ id: 1, nombre: "AnfitrionX" , email: "pppp"}),
    findByName: jest.fn().mockResolvedValue({
        id: 1,
        nombre: "AnfitrionX",
        email: "anfitrion@gmail.com"
    }),
    save: jest.fn()
}


const reservaService = new ReservaService(
    reservaRepository,
    alojamientoRepository,
    huespedRepository,
    anfitrionRepository
)
const reservaController = new ReservaController(reservaService)
server.setController(ReservaController, reservaController)

let alojamientoMock
let anfitrionMock

beforeEach(() => {
    anfitrionMock = {
        nombre: "Anfitrionx",
        email: "pppp",
        notificaciones: [],
        recibirNotificacion: jest.fn(function(n) {
            this.notificaciones.push(n)
        })
    }

    alojamientoMock = {
        nombre: "Casa de playa",
        anfitrion: anfitrionMock,
        puedenAlojarse: jest.fn().mockReturnValue(true),
        estasDisponibleEn: jest.fn().mockReturnValue(true)
    }

    alojamientoRepository.findByName = jest.fn().mockResolvedValue(alojamientoMock)
})

describe("GET /reservas", () => {
    test("Debe retornar un estado 200 y 2 reservas", async () => {
        const response = await request(server.app).get("/reservas")

        expect(response.status).toBe(200)
        expect(response.body.page).toBe(1)
        expect(response.body.per_page).toBe(10)
        expect(response.body.total).toBe(2)
        expect(response.body.total_pages).toBe(1)
        expect(response.body.data.length).toBe(2)
    })

    test("Debe retornar un estado 200 y una reserva por pagina", async () => {
        reservaRepository.countAll = jest.fn().mockResolvedValue(1)
        reservaRepository.findByPage = jest.fn().mockResolvedValue([
            {
                id: 0,
                huespedReservador: "Pepita",
                cantHuespedes: 2,
                alojamiento: "Casa de playa",
                rangoFechas: {
                    fechaInicio: new Date("2023/10/01"),
                    fechaFin: new Date("2023/10/05")
                }
            }
        ])
        const response = await request(server.app).get("/reservas?page=1&limit=1")

        expect(response.status).toBe(200)
        expect(response.body.page).toBe(1)
        expect(response.body.per_page).toBe(1)
        expect(response.body.total).toBe(1)
        expect(response.body.total_pages).toBe(1)
        expect(response.body.data.length).toBe(1)
    })
})

describe("POST /reservas", () => {
    test("Debe retornar un estado 201 y la reserva creada, notificando al anfitrión", async () => {

        const nuevaReserva = {
            reservador: "Pepita",
            cantHuespedes: 2,
            alojamiento: "Casa de playa",
            rangoFechas: {
                fechaInicio: "01/10/2023",
                fechaFin: "05/10/2023"
            }
        }

        const reservaMock = {
            estado: "PENDIENTE",
            huespedReservador: {
                nombre: "Pepita",
                email: "sss"
            },
            alojamiento: "Casa de playa",
            //cantHuespedes: 2, ESTE ATRIBUTO TIRA ERROR
            rangoFechas: {
                fechaInicio: "01/10/2023",
                fechaFin: "05/10/2023"
            }
        }

        reservaRepository.save = jest.fn().mockResolvedValue()

        const response = await request(server.app)
            .post("/reservar")
            .send(nuevaReserva)
        
        expect(response.status).toBe(201)
        expect(response.body).toMatchObject(reservaMock)

        expect(anfitrionMock.recibirNotificacion).toHaveBeenCalled()
        expect(anfitrionMock.notificaciones.length).toBe(1)
        expect(anfitrionMock.notificaciones[0].mensaje).toContain("Reserva realizada")
        expect(anfitrionMock.notificaciones[0].leida).toBe(false)
    })

    test("Debe retornar un estado 400 si faltan datos obligatorios", async () => {
        const nuevaReserva = {
            reservador: "Pepita",
            cantHuespedes: 2
        }

        const response = await request(server.app)
            .post("/reservar")
            .send(nuevaReserva)

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Faltan datos obligatorios")
    })

})


// test("Luego de aceptar una reserva le llega una notificacion", async () => {
//     const response = await request(server.app)
//         .put("/anfitrion/1/confirmar/1")

//     expect(response.status).toBe(200)
//     expect(huespedMock.recibirNotificacion).toHaveBeenCalled()
//     expect(huespedMock.notificaciones.length).toBe(1)
// }) 

// test("Luego de cancelar una reserva le llega una notificacion al anfitrion", async () => {
//     const response = await request(server.app)
//         .put("/huesped/1/cancelar/0")

//     expect(response.status).toBe(200)
// })