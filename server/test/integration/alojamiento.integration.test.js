import { AlojamientoController } from "../../birbnb/controllers/alojamientoController.js";
import { AlojamientoService } from "../../birbnb/services/alojamientoService.js";
import alojamientoRoutes from "../../birbnb/routes/alojamientoRoutes.js";
import { buildTestServer } from "./utils/server.js";
import { describe, expect, jest, test } from "@jest/globals";
import request from "supertest";
import express from "express";
import { errorHandler } from "../../birbnb/middlewares/errorHandler.js";
import { Alojamiento } from "../../birbnb/models/entities/Alojamiento.js";
import { Direccion } from "../../birbnb/models/entities/Direccion.js";
import { Ciudad } from "../../birbnb/models/entities/Ciudad.js";
import { Pais } from "../../birbnb/models/entities/Pais.js";
import { Anfitrion } from "../../birbnb/models/entities/Anfitrion.js";
import { ConflictError, NotFoundError, ValidationError } from "../../birbnb/errors/AppError.js";

const app = express();
const server = buildTestServer(app);

server.addRoute(alojamientoRoutes);
server.configureRoutes();

app.use(errorHandler);

// Mock de repositorios
const alojamientoRepository = {
    findByPage: jest.fn(),
    countAll: jest.fn(),
    findById: jest.fn(),
    findByName: jest.fn(),
    save: jest.fn(),
    deleteById: jest.fn(),
    findByFilters: jest.fn()
};

const anfitrionRepository = {
    findByName: jest.fn()
};

const ciudadRepository = {
    findByName: jest.fn(),
    save: jest.fn()
};

const paisRepository = {
    findByName: jest.fn(),
    save: jest.fn()
};

// Creación del servicio y controlador
const alojamientoService = new AlojamientoService(
    alojamientoRepository,
    anfitrionRepository,
    ciudadRepository,
    paisRepository
);
const alojamientoController = new AlojamientoController(alojamientoService);
server.setController(AlojamientoController, alojamientoController);

// Datos de prueba
const mockAnfitrion = new Anfitrion("AnfitrionX", "anfitrion@test.com");
const mockPais = new Pais("Argentina");
const mockCiudad = new Ciudad("Buenos Aires", mockPais);
const mockDireccion = new Direccion("Calle Falsa", 123, mockCiudad);
const mockAlojamiento = new Alojamiento(
    mockAnfitrion,
    "Casa de playa",
    "Hermosa casa frente al mar",
    100,
    "USD",
    "14:00",
    "10:00",
    mockDireccion,
    4,
    ["Wifi", "Pileta"],
    ["foto1.jpg", "foto2.jpg"]
);

beforeEach(() => {
    jest.clearAllMocks();
    
    // Configuramos los mocks por defecto
    alojamientoRepository.findByPage.mockResolvedValue([mockAlojamiento]);
    alojamientoRepository.countAll.mockResolvedValue(1);
    alojamientoRepository.findById.mockResolvedValue(mockAlojamiento);
    alojamientoRepository.findByName.mockResolvedValue(null);
    alojamientoRepository.save.mockResolvedValue(mockAlojamiento);
    alojamientoRepository.deleteById.mockResolvedValue(true);
    alojamientoRepository.findByFilters.mockResolvedValue([mockAlojamiento]);
    
    anfitrionRepository.findByName.mockResolvedValue(mockAnfitrion);
    ciudadRepository.findByName.mockResolvedValue(mockCiudad);
    paisRepository.findByName.mockResolvedValue(mockPais);
});

describe("GET /birbnb/alojamientos", () => {
    test("Debe retornar un estado 200 y lista paginada de alojamientos", async () => {
        const response = await request(server.app).get("/birbnb/alojamientos");
        
        expect(response.status).toBe(200);
        expect(response.body.page).toBe(1);
        expect(response.body.per_page).toBe(10);
        expect(response.body.total).toBe(1);
        expect(response.body.total_pages).toBe(1);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].nombre).toBe("Casa de playa");
    });

    test("Debe retornar un estado 200 con paginación personalizada", async () => {
        alojamientoRepository.countAll.mockResolvedValue(15);
        alojamientoRepository.findByPage.mockResolvedValue([mockAlojamiento]);
        
        const response = await request(server.app)
            .get("/birbnb/alojamientos?page=2&limit=5");
        
        expect(response.status).toBe(200);
        expect(response.body.page).toBe(2);
        expect(response.body.per_page).toBe(5);
        expect(response.body.total).toBe(15);
        expect(response.body.total_pages).toBe(3);
    });

    test("Debe retornar un estado 200 con filtros aplicados", async () => {
        const response = await request(server.app)
            .get("/birbnb/alojamientos?ciudad=Buenos+Aires&precioMax=150");
        
        expect(response.status).toBe(200);
        expect(alojamientoRepository.findByFilters).toHaveBeenCalled();
    });
});

describe("GET /birbnb/alojamientos/:id", () => {
    test("Debe retornar un estado 200 y el alojamiento solicitado", async () => {
        const response = await request(server.app).get("/birbnb/alojamientos/1");
        
        expect(response.status).toBe(200);
        expect(response.body.nombre).toBe("Casa de playa");
        expect(response.body.anfitrion.nombre).toBe("AnfitrionX");
        expect(response.body.direccion.ciudad.nombre).toBe("Buenos Aires");
    });

    test("Debe retornar un estado 404 si el alojamiento no existe", async () => {
        alojamientoRepository.findById.mockResolvedValue(null);
        
        const response = await request(server.app).get("/birbnb/alojamientos/999");
        
        expect(response.status).toBe(404);
        expect(response.body.message).toContain("no encontrado");
    });
});

describe("POST /birbnb/alojamientos", () => {
    test("Debe retornar un estado 201 y crear un nuevo alojamiento", async () => {
        const nuevoAlojamiento = {
            anfitrion: "AnfitrionX",
            nombre: "Departamento céntrico",
            descripcion: "Departamento en zona céntrica",
            precioPorNoche: 80,
            moneda: "USD",
            horarioCheckIn: "15:00",
            horarioCheckOut: "11:00",
            direccion: {
                calle: "Av. Principal",
                altura: 456,
                ciudad: {
                    nombre: "Buenos Aires",
                    pais: {
                        nombre: "Argentina"
                    }
                }
            },
            cantHuespedesMax: 3,
            caracteristicas: ["Wifi", "Cocina"],
            fotos: ["foto1.jpg"]
        };

        // Mock to return the actual input
        alojamientoRepository.save.mockResolvedValueOnce({
            ...mockAlojamiento,
            nombre: "Departamento céntrico"
        });

        const response = await request(server.app)
            .post("/birbnb/alojamientos")
            .send(nuevoAlojamiento);
        
        expect(response.status).toBe(201);
        expect(response.body.nombre).toBe("Departamento céntrico");
        expect(alojamientoRepository.save).toHaveBeenCalled();
    });

    test("Debe retornar un estado 400 si faltan datos obligatorios", async () => {
        const alojamientoIncompleto = {
            nombre: "Departamento céntrico",
            descripcion: "Departamento en zona céntrica",
            precioPorNoche: 80
        };

        const response = await request(server.app)
            .post("/birbnb/alojamientos")
            .send(alojamientoIncompleto);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Faltan datos obligatorios");
    });

    test("Debe retornar un estado 409 si el nombre ya existe", async () => {
        alojamientoRepository.findByName.mockResolvedValue(mockAlojamiento);
        
        const nuevoAlojamiento = {
            anfitrion: "AnfitrionX",
            nombre: "Casa de playa",
            descripcion: "Otra descripción",
            precioPorNoche: 100,
            moneda: "USD",
            horarioCheckIn: "14:00",
            horarioCheckOut: "10:00",
            direccion: {
                calle: "Otra calle",
                altura: 456,
                ciudad: {
                    nombre: "Buenos Aires",
                    pais: {
                        nombre: "Argentina"
                    }
                }
            },
            cantHuespedesMax: 4,
            caracteristicas: ["Wifi"],
            fotos: ["foto.jpg"]
        };

        const response = await request(server.app)
            .post("/birbnb/alojamientos")
            .send(nuevoAlojamiento);
        
        expect(response.status).toBe(409);
        expect(response.body.message).toContain("ya existe");
    });
});

describe("POST /birbnb/alojamientos/array", () => {
    test("Debe retornar un estado 200 al importar un array de alojamientos", async () => {
        const arrayAlojamientos = [
            {
                anfitrion: "AnfitrionX",
                nombre: "Alojamiento 1",
                descripcion: "Descripción 1",
                precioPorNoche: 100,
                moneda: "USD",
                horarioCheckIn: "14:00",
                horarioCheckOut: "10:00",
                direccion: {
                    calle: "Calle 1",
                    altura: 123,
                    ciudad: {
                        nombre: "Buenos Aires",
                        pais: {
                            nombre: "Argentina"
                        }
                    }
                },
                cantHuespedesMax: 2,
                caracteristicas: ["Wifi"],
                fotos: ["foto1.jpg"]
            },
            {
                anfitrion: "AnfitrionX",
                nombre: "Alojamiento 2",
                descripcion: "Descripción 2",
                precioPorNoche: 150,
                moneda: "USD",
                horarioCheckIn: "15:00",
                horarioCheckOut: "11:00",
                direccion: {
                    calle: "Calle 2",
                    altura: 456,
                    ciudad: {
                        nombre: "Buenos Aires",
                        pais: {
                            nombre: "Argentina"
                        }
                    }
                },
                cantHuespedesMax: 4,
                caracteristicas: ["Wifi", "Pileta"],
                fotos: ["foto2.jpg"]
            }
        ];

        alojamientoRepository.save.mockImplementation(alojamiento => Promise.resolve(alojamiento));

        const response = await request(server.app)
            .post("/birbnb/alojamientos/array")
            .send(arrayAlojamientos);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toContain("Importación completa");
        expect(alojamientoRepository.save).toHaveBeenCalledTimes(2);
    });
});