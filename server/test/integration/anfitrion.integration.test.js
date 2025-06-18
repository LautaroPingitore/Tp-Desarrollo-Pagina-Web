import { AnfitrionController } from "../../birbnb/controllers/anfitrionController.js";
import { AnfitrionService } from "../../birbnb/services/anfitrionService.js";
import anfitrionRoutes from "../../birbnb/routes/anfitrionRoutes.js";
import { buildTestServer } from "./utils/server.js";
import { describe, expect, jest, test } from "@jest/globals";
import request from "supertest";
import express from "express"
import { Anfitrion } from "../../birbnb/models/entities/Anfitrion.js";
import { errorHandler } from "../../birbnb/middlewares/errorHandler.js";

const app = express()
const server = buildTestServer(app)

server.addRoute(anfitrionRoutes)
server.configureRoutes()

app.use(errorHandler)

const anfitrionRepository = {
    findByPage: jest.fn().mockResolvedValue(
        [
            {
                id: 0,
                nombre: "Pepita",
                email: "pepita@gmail.com"
            },
            {
                id: 1,
                nombre: "Juanito",
                email: "juanito@gmail.com"
            }
        ]
    ),
    countAll: jest.fn().mockResolvedValue(2)
}

const anfitrionService = new AnfitrionService(anfitrionRepository)
const anfitrionController = new AnfitrionController(anfitrionService)

server.setController(AnfitrionController, anfitrionController)

describe("GET /birbnb/anfitriones", () => {
    
    test("Debe retornar un estado 200 y 2 anfitriones", async () => {
        const response = await request(server.app).get("/birbnb/anfitriones")

        expect(response.status).toBe(200)
        expect(response.body.page).toBe(1)
        expect(response.body.per_page).toBe(10)
        expect(response.body.total).toBe(2)
        expect(response.body.total_pages).toBe(1)
        expect(response.body.data.length).toBe(2)
    })

    test("Debe retorunar un estado 200 y un anfitrion por pagina", async () => {
        anfitrionRepository.findByPage = jest.fn().mockResolvedValue([
            {
                id: 0,
                nombre: "Pepita",
                email: "pepita@gmail.com"
            },
        ])

        const response = await request(server.app).get("/birbnb/anfitriones?page=1&limit=1")

        expect(response.status).toBe(200)
        expect(response.body.page).toBe(1)
        expect(response.body.per_page).toBe(1)
        expect(response.body.total).toBe(2)
        expect(response.body.total_pages).toBe(2)
        expect(response.body.data.length).toBe(1)
    })
})

describe("POST /login/anfitrion", () => {

    test("Debe retornar un estado 201 y el anfitrion creado", async () => {
        const newAnfitrion = {
            nombre: "Pepita",
            email: "pepita@gmail.com"
        }

        const savedAnfitrion = {
            id: "1",
            nombre: "Pepita",
            email: "pepita@gmail.com",
            notificaciones: []
        }

        anfitrionRepository.findByName = jest.fn().mockResolvedValue(null)
        anfitrionRepository.findByEmail = jest.fn().mockResolvedValue(null)

        anfitrionRepository.save = jest.fn().mockResolvedValue(savedAnfitrion)
        
        const response = await request(server.app).post("/birbnb/login/anfitrion").send(newAnfitrion)

        expect(response.status).toBe(201)
        expect(anfitrionRepository.save).toHaveBeenCalled()
        expect(anfitrionRepository.save).toHaveBeenCalledWith(expect.any(Anfitrion))
    })

    test("Debe retornar un 400 si falta un dato", async () => {
        const newAnfitrion = {
            nombre: "Pepe"
        }

        const response = await request(server.app).post("/birbnb/login/anfitrion").send(newAnfitrion)

        expect(response.status).toBe(400)
        expect(response.body.message).not.toBeUndefined()
        expect(response.body.message).toBe("Faltan datos obligatorios")
    })
})