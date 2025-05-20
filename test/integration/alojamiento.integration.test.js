//import { AnfitrionController } from "../../birbnb/controllers/anfitrionController.js";
//import { AlojamientoController } from "../../birbnb/controllers/alojamientoController.js";
//import { Alojamiento } from "../../birbnb/models/alojamiento.js";
//import alojamientoRoute from "../../birbnb/routes/alojamientoRoute.js";
//import { db } from "../../birbnb/db.js";
//import { buildTestServer } from "./utils/server.js";
//import { describe, expect, jest, test } from "@jest/globals";
//import request from "supertest";
//import express from "express";
//import { errorHandler } from "../../birbnb/middlewares/errorHandler.js";
//
//
//const app = express()
//const server = buildTestServer(app)
//
//server.addRoute(alojamientoRoute)
//server.configureRoutes()
//
//app.use(errorHandler)
//
//
//const alojamientoRepository = {
//    countAll: jest.fn().mockResolvedValue(2),
//    findById: jest.fn(),
//    findAll: jest.fn(),
//    create: jest.fn(),
//    update: jest.fn(),
//    delete: jest.fn(),
//    
//    
//}