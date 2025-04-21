import { RangoFechas } from './modelos/RangoFechas.js'
import { Alojamiento } from './modelos/Alojamiento.js'
import { Caracteristica } from './enums/Caracteristica.js'
import { Foto } from  './modelos/Foto.js'
import { TipoUsuario } from './enums/TipoUsuario.js'
import { Usuario } from './modelos/Usuario.js'
import { Reserva } from './modelos/Reserva.js'

const huesped1 = new Usuario ( 'Martin', 'martin33@gmail.com', TipoUsuario.HUESPED, []); 
const anfitrion1 = new Usuario ('Gaston', 'gaston445@gmail.com', TipoUsuario.ANFITRION, []);

const fechaReserva = new RangoFechas(new Date(2023, 10, 3), new Date(2023, 10, 6)); 
const fechaReserva2 = new RangoFechas(new Date(2023, 10, 7), new Date(2023, 10, 9));
const alojamiento  = new Alojamiento(anfitrion1, 'Casa de playa', 'Casa en la playa', 100, 'USD', '14:00', '10:00', 'Calle Falsa 123', 4, [Caracteristica.WIFI, Caracteristica.PISCINA], [new Foto('Casa de playa', 'casa.jpg'), new Foto('Casa de playa', 'casa2.jpg')]);

//--------------------------------------------------------------------

const reserva1 = alojamiento.reservar(huesped1, 3, fechaReserva);
// const reserva2 = alojamiento.reservar(huesped1, 3, fechaReserva2);

console.log(reserva1);
// console.log(reserva2);

console.log("");

anfitrion1.aceptarReserva(reserva1);
console.log(huesped1.notificaciones);

console.log("\n");

huesped1.cancelarReserva(reserva1, "Porque si");
console.log(anfitrion1.notificaciones);