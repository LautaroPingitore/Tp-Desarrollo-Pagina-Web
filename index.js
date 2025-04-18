  import { RangoFechas } from './modelos/RangoFechas.js'
  import { Alojamiento } from './modelos/Alojamiento.js'
  import { Caracteristica } from './enums/Caracteristica.js'
    import { Foto } from  './modelos/Foto.js'
import {TipoUsuario} from './enums/TipoUsuario.js'
import { Usuario } from './modelos/Usuario.js'
import { Reserva } from './modelos/Reserva.js'



const huesped1 = new Usuario ( 'Martin', 'martin33@gmail.com', TipoUsuario.HUESPED, []); 
const anfitrion1 = new Usuario ('Gaston', 'gaston445@gmail.com', TipoUsuario.ANFITRION, []);



const fechaReserva = new RangoFechas(new Date(2023, 10, 3), new Date(2023, 10, 6)); 
const fechaReserva2 = new RangoFechas(new Date(2023, 10, 7), new Date(2023, 10, 9));
const alojamiento  = new Alojamiento(anfitrion1, 'Casa de playa', 'Casa en la playa', 100, 'USD', '14:00', '10:00', 'Calle Falsa 123', 4, [Caracteristica.WIFI, Caracteristica.PISCINA], [new Foto('Casa de playa', 'casa.jpg'), new Foto('Casa de playa', 'casa2.jpg')]);

//const reserva1 = new Reserva(new Date(2023, 9, 22), huesped1, 2, alojamiento, new RangoFechas(new Date(2023, 9, 22), new Date(2023, 9, 30)), 100);
//const reserva2 = new Reserva(new Date(2023, 9, 22), huesped1, 2, alojamiento, new RangoFechas(new Date(2023, 9, 25), new Date(2023, 9, 30)), 100);


//--------------------------------------------------------------------


// PROBE VER SI SE AGREGAN LAS RESERVAS AL ALOJAMIENTO (FUNCIONA)

const reserva1=alojamiento.reservar(huesped1, 3, fechaReserva);
const reserva2=alojamiento.reservar(huesped1, 3, fechaReserva2);

console.log(reserva1);
console.log(reserva2);
//console.log(alojamiento.reservar(huesped1, 3, fechaReserva2));


console.log(alojamiento);

//console.log(alojamiento.estasDisponibleEn(fechaReserva)); // undefined

//console.log('Inicio: ' + fechaReserva.fechaInicio + 'Fin:' + fechaReserva.fechaFin);

//console.log(fechaReserva.seSuperponeCon(new RangoFechas(new Date(2023, 9, 22), new Date(2023, 9, 30)))); // true

// 2023-11-01T00:00:00.000Z

