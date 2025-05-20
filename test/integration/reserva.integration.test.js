import {reservaController as ReservaControllerClass} from '../../src/controllers/reserva.controller.js';
import { Reserva } from '../../src/models/reserva.js';
import reservaRoute from '../../src/routes/reserva.route.js';
import { buildTestServer } from "./utils/server.js";
import { describe, expect, jest, test } from "@jest/globals";
import request from 'supertest';
import express from 'express';
import { errorHandler } from '../../birbnb/middlewares/errorHandler.js';

const app = express()
const server = buildTestServer(app)

server.addRoute(reservaRoute)
server.configureRoutes()

app.use(errorHandler)

const reservaRepository ={
    findByPage: jest.fn().mockResolvedValue(
        [
            {
                id: 0,
                reservador: "Pepita",
                cantHuespedes: 2,
                alojamiento: "Casa de playa",
                fechas: {
                    fechaInicio: "2023-10-01",
                    fechaFin: "2023-10-05"
                }
            },
            {
                id: 1,
                reservador: "Juanito",
                cantHuespedes: 4,
                alojamiento: "Cabaña en la montaña",
                fechas: {
                    fechaInicio: "2023-11-01",
                    fechaFin: "2023-11-05"
                }
            }
        ]
    ),
    countAll: jest.fn().mockResolvedValue(2)
}

const reservaService = new Reserva(reservaRepository)
const reservaController = new reservaController(reservaService)

server.setController(reservaController, reservaController)

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
        reservaRepository.findByPage = jest.fn().mockResolvedValue([
            {
                id: 0,
                reservador: "Pepita",
                cantHuespedes: 2,
                alojamiento: "Casa de playa",
                fechas: {
                    fechaInicio: "2023-10-01",
                    fechaFin: "2023-10-05"
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
            reservador: "Pepita",
            cantHuespedes: 2,
            alojamiento: "Casa de playa",
            fechas: {
                fechaInicio: "2023-10-01",
                fechaFin: "2023-10-05"
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