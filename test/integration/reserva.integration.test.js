import { ReservaController } from "../../birbnb/controllers/reservaController.js";
import { ReservaService } from "../../birbnb/services/reservaService.js";
import reservaRoutes from "../../birbnb/routes/reservaRoutes.js";
import { buildTestServer } from "./utils/server.js";
import { describe, expect, jest, test } from "@jest/globals";
import request from "supertest";
import express from "express";
import { Reserva } from "../../birbnb/models/entities/Reserva.js";
import { errorHandler } from "../../birbnb/middlewares/errorHandler.js";
import { RangoFechas } from "../../birbnb/models/entities/RangoFechas.js";
import { Alojamiento } from "../../birbnb/models/entities/Alojamiento.js";

const app = express()
const server = buildTestServer(app)

server.addRoute(reservaRoutes)
server.configureRoutes()

app.use(errorHandler)

const reservaRepository ={
    countAll: jest.fn().mockResolvedValue(2),
    findByName: jest.fn().mockResolvedValue(null), 
    findByPage: jest.fn().mockResolvedValue(
        [
            {
                id: 0,
                reservador: {nombre: "Pepita", email: "pepita@example.com"},
                cantHuespedes: 2,
                alojamiento: {nombre : "Casa de playa"},
                rangoFechas: {
                    fechaInicio: new Date("2023-10-01"),
                    fechaFin: new Date("2023-10-05")
                }
            },
            {
                id: 1,
                reservador: {nombre: "Juanito", email: "juanito@example.com"},
                cantHuespedes: 4,
                alojamiento: {nombre: "Cabaña en la montaña"},
                rangoFechas: {
                    fechaInicio: new Date("2023-11-01"),
                    fechaFin: new Date("2023-11-05")
                }
            }
        ]
    ),
    countAll: jest.fn().mockResolvedValue(2)
}

const reservaService = new ReservaService(reservaRepository)
const reservaController = new ReservaController(reservaService)

server.setController(ReservaController, reservaController)

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
        reservaRepository.countAll = jest.fn().mockResolvedValue(1);
        reservaRepository.findByPage = jest.fn().mockResolvedValue([
            {
                id: 0,
                reservador: {nombre: "Pepita", email: "pepita@example.com"},
                cantHuespedes: 2,
                alojamiento: {nombre: "Casa de playa"},
                rangoFechas: {
                    fechaInicio: new Date("2023-10-01"),
                    fechaFin: new Date("2023-10-05")
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
    test("Debe retornar un estado 201 y la reserva creada", async () => {

        const nuevaReserva = {
            reservador: {nombre: "Pepita", email: "pepita@example.com"},
            cantHuespedes: 2,
            alojamiento: {nombre: "Casa de playa"},
            rangoFechas: {
                fechaInicio: new Date("2023-10-01"),
                fechaFin: new Date("2023-10-05")
            }
        }

        reservaRepository.save = jest.fn().mockResolvedValue(nuevaReserva)

        const response = await request(server.app)
            .post("/reservas")
            .send(nuevaReserva)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(nuevaReserva)
    })

    test("Debe retornar un estado 400 si faltan datos obligatorios", async () => {
        const nuevaReserva = {
            reservador: "Pepita",
            cantHuespedes: 2
        }

        const response = await request(server.app)
            .post("/reservas")
            .send(nuevaReserva)

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Faltan datos obligatorios")
    })
})