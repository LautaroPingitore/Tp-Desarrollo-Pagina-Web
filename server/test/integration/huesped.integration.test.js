import { HuespedController } from "../../birbnb/controllers/huespedController.js";
import { HuespedService } from "../../birbnb/services/huespedService.js";
import huespedRoutes from "../../birbnb/routes/huespedRoutes.js";
import { buildTestServer } from "./utils/server.js";
import { describe, expect, jest, test } from "@jest/globals";
import request from "supertest";
import express from "express"
import { Huesped } from "../../birbnb/models/entities/Huesped.js";
import { errorHandler } from "../../birbnb/middlewares/errorHandler.js";

const app = express()
const server = buildTestServer(app)

server.addRoute(huespedRoutes)
server.configureRoutes()

app.use(errorHandler)

const huespedRepository = {
    countAll: jest.fn().mockResolvedValue(2),
    findByName: jest.fn().mockResolvedValue(null),
    findByEmail: jest.fn().mockResolvedValue(null), 
    findByPage: jest.fn().mockResolvedValue([
        {
            id: 0,
            nombre: "Pedro1 el huesped",
            email: "pedro1@example.com"
        },
        {
            id: 1,
            nombre: "Pedro2 el huesped",
            email: "pedro2@example.com"
        }
    ]),
    save: jest.fn().mockImplementation(h => { 
        h.id = Math.floor(Math.random() * 1000); 
        return Promise.resolve(h);
    }),
}

const huespedService = new HuespedService(huespedRepository)
const huespedController = new HuespedController(huespedService)
server.setController(HuespedController, huespedController)

describe("GET /huespedes", () => {

        test("debería retornar un estado 200 y 2 anfitriones", async () => {
            const response = await request(server.app).get("/huespedes")
    
            expect(response.status).toBe(200)
            expect(response.body.page).toBe(1)
            expect(response.body.per_page).toBe(10)
            expect(response.body.total).toBe(2)
            expect(response.body.total_pages).toBe(1)
            expect(response.body.data.length).toBe(2)
        })

        test("debería retornar un estado 200 y un huesped por pagina", async () => {
        huespedRepository.countAll = jest.fn().mockResolvedValue(1);
        huespedRepository.findByPage = jest.fn().mockResolvedValue([
        {
            id: 0,
            nombre: "Pedo1 el huesped",
            email: "pedro1@example.com"
        }
        ]);

        const response = await request(server.app).get("/huespedes?page=1&limit=1");

        expect(response.status).toBe(200);
        expect(response.body.page).toBe(1);
        expect(response.body.per_page).toBe(1);
        expect(response.body.total).toBe(1);
        expect(response.body.total_pages).toBe(1);
        expect(response.body.data.length).toBe(1);
        })
    })

describe("POST /huespedes", () => {
    test("debería retornar un estado 201 y el huesped creado", async () => {
        const huesped = {
            nombre: "Santino el huesped",
            email: "santino@example.com"
        }

        const response = await request(server.app).post("/login/huesped").send(huesped)

        expect(response.status).toBe(201)
        expect(response.body).toEqual({
            id: expect.any(Number),
            nombre: "Santino el huesped",
            email: "santino@example.com",
            notificaciones:[]
        })
    })


    test("Debe retornar un estado 400 si el huesped no tiene nombre", async () => {
    const huesped = {
        email: "santino@example.com"
    }

    const response = await request(server.app).post("/login/huesped").send(huesped)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
        status: "fail",
        message: "Faltan datos obligatorios"
    })
    })
})