import { AnfitrionController } from "../../birbnb/controllers/anfitrionController.js";
import { AnfitrionService } from "../../birbnb/services/anfitrionService.js";
import anfitrionRoutes from "../../birbnb/routes/anfitrionRoutes.js";
import { buildTestServer } from "./utils/server.js";
import { describe, expect, jest } from "@jest/globals";
import request from "supertest";

const server = buildTestServer()

server.addRoute(anfitrionRoutes)
server.configureRoutes()

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

// Se arregla si las funciones de los repositorios son async
// describe("GET /anfitriones", () => {
//     test("Debe retornar un estado 200 y 2 anfitriones", async () => {
//         const response = await request(server.app).get("/anfitriones")

//         expect(response.status).toBe(200)
//         expect(response.body.page).toBe(1)
//         expect(response.body.per_page).toBe(10)
//         expect(response.body.total).toBe(2)
//         expect(response.body.totla_pages).toBe(1)
//         expect(response.body.data.length).toBe(2)
//     })
// })