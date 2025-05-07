import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { Server } from "./server.js";

import routes from "./birbnb/routes/routes.js";

import { AlojamientoRepository } from "./birbnb/models/repositories/alojamientoRepository.js";
import { AnfitrionRepository } from "./birbnb/models/repositories/anfitrionRepository.js";
import { HuespedRepository } from "./birbnb/models/repositories/huespedRepository.js";
import { ReservaRepository } from "./birbnb/models/repositories/reservaRepository.js";


import { AlojamientoService } from "./birbnb/services/alojamientoService.js";
import { AnfitrionService } from "./birbnb/services/anfitrionService.js";
import { HuespedService } from "./birbnb/services/huespedService.js";
import { ReservaService } from "./birbnb/services/reservaService.js";

import { AlojamientoController } from "./birbnb/controllers/alojamientoController.js";
import { AnfitrionController } from "./birbnb/controllers/anfitrionController.js";
import { HuespedController } from "./birbnb/controllers/huespedController.js";
import { ReservaController } from "./birbnb/controllers/reservaController.js";

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app, port);

// Configuración de dependencias
const alojamientoRepo = new AlojamientoRepository();
const alojamientoService = new AlojamientoService(alojamientoRepo);
const alojamientoController = new AlojamientoController(alojamientoService);

const anfitrionRepo = new AnfitrionRepository();
const anfitrionService = new AnfitrionService(anfitrionRepo);
const anfitrionController = new AnfitrionController(anfitrionService);

const huespedRepo = new HuespedRepository();
const huespedService = new HuespedService(huespedRepo);
const huespedController = new HuespedController(huespedService);

const reservaRepo = new ReservaRepository();
const reservaService = new ReservaService(reservaRepo);
const reservaController = new ReservaController(reservaService);

// Registro del controlador en el servidor
server.setController(AlojamientoController, alojamientoController);
server.setController(AnfitrionController, anfitrionController);
server.setController(HuespedController, huespedController);
server.setController(ReservaController, reservaController);

// Configuración de rutas y lanzamiento
routes.forEach(r => {
    server.addRoute(r);
})
server.configureRoutes();
server.launch();