import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { Server } from "./server.js";

import { AlojamientoRepository } from "./birbnb/models/repositories/alojamientoRepository.js";
import { AlojamientoService } from "./birbnb/services/alojamientoService.js";
import { AlojamientoController } from "./birbnb/controllers/alojamientoController.js";

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app, 3000);

// Configuración de dependencias
const alojamientoRepo = new AlojamientoRepository();
const alojamientoService = new AlojamientoService(alojamientoRepo);
const alojamientoController = new AlojamientoController(alojamientoService);

// Registro del controlador en el servidor
server.setController(AlojamientoController, alojamientoController);

// Configuración de rutas y lanzamiento
server.configureRoutes();
server.launch();

// TODO ESTO TENDRIA QUE ESTAR EN LOS TESTS, PERO NO ASI, SI NO QUE LOS TESTS SE HARIAN EN BASE A CONSULTAS AL SERVIDOR

// import { RangoFechas } from './modelos/RangoFechas.js'
// import { Alojamiento } from './modelos/Alojamiento.js'
// import { Caracteristica } from './enums/Caracteristica.js'
// import { Foto } from  './modelos/Foto.js'
// import { Usuario } from './modelos/Usuario.js'
// import { Huesped } from './modelos/Huesped.js'
// import { Anfitrion } from './modelos/Anfitrion.js'
// import { Direccion } from './modelos/Direccion.js'
// import { Ciudad } from './modelos/Ciudad.js'
// import { SistemaBirbnb } from './modelos/SistemaBirbnb.js'
// import { Reserva } from './modelos/Reserva.js'

// const huesped1 = new Huesped ( 'Martin', 'martin33@gmail.com'); 
// const anfitrion1 = new Anfitrion ('Gaston', 'gaston445@gmail.com');

// const fechaReserva = new RangoFechas(new Date(2023, 10, 3), new Date(2023, 10, 6)); 
// const fechaReserva2 = new RangoFechas(new Date(2023, 10, 7), new Date(2023, 10, 9));
// const direccion1 = new Direccion('Calle Falsa', 123, new Ciudad('CABA', 'Argentina'), -34.6037, -58.3816);
// const direccion2 = new Direccion('Calle Falsa', 456, new Ciudad('CABA', 'Argentina'), -34.6037, -58.3816);
// const direccion3 = new Direccion('Calle Falsa', 789, new Ciudad('Villa ortuzar', 'Argentina'), -34.6037, -58.3816);
// const alojamiento  = new Alojamiento(anfitrion1, 'Casa de playa', 'Casa en la playa', 250, 'USD', '14:00', '10:00', direccion1 , 4, [Caracteristica.WIFI, Caracteristica.PISCINA], [new Foto('Casa de playa', 'casa.jpg'), new Foto('Casa de playa', 'casa2.jpg')]);
// const alojamiento2  = new Alojamiento(anfitrion1, 'Casa de montaña', 'Casa en la montaña', 200, 'USD', '14:00', '10:00', direccion2, 4, [Caracteristica.WIFI], [new Foto('Casa de montaña', 'casa.jpg'), new Foto('Casa de montaña', 'casa2.jpg')]); 
// const alojamiento3  = new Alojamiento(anfitrion1, 'Casa de campo', 'Casa en el campo', 300, 'USD', '14:00', '10:00', direccion3, 4, [Caracteristica.ESTACIONAMIENTO, Caracteristica.PISCINA], [new Foto('Casa de campo', 'casa.jpg'), new Foto('Casa de campo', 'casa2.jpg')]); 
// //--------------------------------------------------------------------

// const sistema = new SistemaBirbnb();
// sistema.agregarAlojamiento(alojamiento);
// sistema.agregarAlojamiento(alojamiento2);
// sistema.agregarAlojamiento(alojamiento3);
// const reserva1 = Reserva.reservar(alojamiento, huesped1, 1, fechaReserva);
// const reserva2 = Reserva.reservar(alojamiento, huesped1, 1, fechaReserva2); 

// anfitrion1.aceptarReserva(reserva1);
// huesped1.cancelarReserva(reserva1, "XD");

// anfitrion1.aceptarReserva(reserva2);
// huesped1.cancelarReserva(reserva2);

// console.log(anfitrion1.notificaciones);
// console.log(huesped1.notificaciones);

// var alojamientosFiltrados = sistema.buscarAlojamientosV2(new Ciudad('Villa ortuzar', 'Argentina'),4 , new Date(2023, 10, 6), new Date(2023, 11, 20), 100, 300, [Caracteristica.ESTACIONAMIENTO, Caracteristica.PISCINA]);

// //console.log(alojamientosFiltrados);

// var aloj = sistema.buscarAlojamientos({cantHuespedes:2, fechaInicio:new Date(2023, 10, 6), precioMin:100});
// //console.log(aloj);

// /* console.log(reserva1);
// // console.log(reserva2);

// console.log("");

// anfitrion1.aceptarReserva(reserva1);
// console.log(huesped1.notificaciones);

// console.log("\n");

// huesped1.cancelarReserva(reserva1, "Porque si");
// console.log(anfitrion1.notificaciones);  */


