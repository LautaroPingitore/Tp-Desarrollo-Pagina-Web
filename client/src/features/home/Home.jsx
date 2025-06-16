import BloqueFiltro from "../../components/filtros/bloqueFiltro/BloqueFiltros"
import BloqueAlojamiento from "../../components/bloqueAlojamientos/bloqueAlojamientos"
import { useState, useEffect } from "react"
import {getAlojamientos} from "../../api/api.js"

const Home = () => {
    // const alojamientos = [
        /* {
            id: 1,
            nombre: "Hotel Playa",
            descripcion: "Un hotel con vista al mar ubicado en primera línea de playa. Perfecto para unas vacaciones relajantes con acceso directo a la arena dorada y aguas cristalinas. Cuenta con todas las comodidades modernas y un servicio excepcional.",
            precio: 100,
            images: [
                'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            location: "Mar del Plata, Argentina",
            rating: 4.9,
            reviewCount: 89,
            propertyType: "Hotel",
            guests: 6,
            bedrooms: 3,
            bathrooms: 2,
            amenities: ['Wifi', 'Pileta', 'Estacionamiento', 'AC', 'Mascotas']
        }, */
    //     {
    //         id: 2,
    //         nombre: "Cabaña en el bosque",
    //         descripcion: "Una cabaña acogedora en el bosque rodeada de naturaleza pura. Ideal para desconectarse de la ciudad y disfrutar de la tranquilidad del campo. Incluye chimenea y vista panorámica a las montañas.",
    //         precio: 80,
    //         images: [
    //             'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    //         ],
    //         location: "Bariloche, Argentina",
    //         rating: 4.7,
    //         reviewCount: 56,
    //         propertyType: "Cabaña",
    //         guests: 4,
    //         bedrooms: 2,
    //         bathrooms: 1,
    //         amenities: ['Wifi', 'Fireplace', 'Mascotas', 'Estacionamiento', 'BBQ Grill']
    //     },
    //     {
    //         id: 3,
    //         nombre: "Apartamento en la ciudad",
    //         descripcion: "Un apartamento moderno en el centro de la ciudad con todas las comodidades. Ubicación estratégica cerca de restaurantes, teatros y centros comerciales. Perfecto para viajes de negocios o turismo urbano.",
    //         precio: 120,
    //         images: [
    //             'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800'
    //         ],
    //         location: "Buenos Aires, Argentina",
    //         rating: 4.8,
    //         reviewCount: 127,
    //         propertyType: "Apartamento completo",
    //         guests: 4,
    //         bedrooms: 2,
    //         bathrooms: 1,
    //         amenities: ['Wifi', 'Mascotas', 'AC', 'Estacionamiento']
    //     },
    //     {
    //         id: 4,
    //         nombre: "Villa de lujo",
    //         descripcion: "Una villa de lujo con piscina privada y jardín. Diseño exclusivo con acabados de primera calidad. Ideal para grupos grandes que buscan privacidad y confort en un entorno elegante.",
    //         precio: 300,
    //         images: [
    //             'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=800'
    //         ],
    //         location: "Mendoza, Argentina",
    //         rating: 4.9,
    //         reviewCount: 203,
    //         propertyType: "Villa",
    //         guests: 8,
    //         bedrooms: 4,
    //         bathrooms: 3,
    //         amenities: ['Wifi', 'Pileta', 'Mascotas', 'Estacionamiento', 'AC', 'Hot Tub']
    //     },
    //     {
    //         id: 5,
    //         nombre: "Hostal económico",
    //         descripcion: "Un hostal económico para mochileros y viajeros con presupuesto ajustado. Ambiente juvenil y multicultural. Incluye cocina compartida y áreas comunes para socializar.",
    //         precio: 30,
    //         images: [
    //             'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800'
    //         ],
    //         location: "Córdoba, Argentina",
    //         rating: 4.3,
    //         reviewCount: 95,
    //         propertyType: "Habitación compartida",
    //         guests: 2,
    //         bedrooms: 1,
    //         bathrooms: 1,
    //         amenities: ['Wifi', 'Mascotas']
    //     },
    //     {
    //         id: 6,
    //         nombre: "Casa de campo",
    //         descripcion: "Una casa de campo tranquila y acogedora perfecta para familias. Amplio jardín con parrilla y juegos para niños. Entorno seguro y relajante lejos del bullicio de la ciudad.",
    //         precio: 90,
    //         images: [
    //             'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    //             'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800'
    //         ],
    //         location: "Tandil, Argentina",
    //         rating: 4.6,
    //         reviewCount: 73,
    //         propertyType: "Casa completa",
    //         guests: 6,
    //         bedrooms: 3,
    //         bathrooms: 2,
    //         amenities: ['Wifi', 'Mascotas', 'BBQ Grill', 'Estacionamiento']
    //     },
    //     {
    //         id: 7,
    //         nombre: "Hotel Boutique",
    //         descripcion: "Un hotel boutique con encanto",
    //         precio: 150,
    //         imagen: "https://via.placeholder.com/150"
    //     },
    //     {
    //         id: 8,
    //         nombre: "Cabaña de montaña",
    //         descripcion: "Una cabaña de montaña con vistas impresionantes",
    //         precio: 110,
    //         imagen: "https://via.placeholder.com/150"
    //     },
    //     {
    //         id: 9,
    //         nombre: "Apartamento frente al mar",
    //         descripcion: "Un apartamento con vista al mar y acceso a la playa",
    //         precio: 200,
    //         imagen: "https://via.placeholder.com/150"
    //     },
    //     {
    //         id: 10,
    //         nombre: "Casa en la playa",
    //         descripcion: "Una casa de playa con acceso directo a la arena",
    //         precio: 250,
    //         imagen: "https://via.placeholder.com/150"
    //     }
    // ];

    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [filtros, setFiltros] = useState("")
    const [alojamientosPagina, setAlojamientosPagina] = useState([])

    useEffect(() => {
        cargarAlojamientos()
    }, [pageNumber])

    const cargarAlojamientos = async () => {
        try {
            console.log(`Cargando alojamientos de la página ${pageNumber}`)
            const response = await getAlojamientos(pageNumber)
            setAlojamientosPagina(response.data)
            setTotalPages(response.totalPages)
            setPageNumber(response.page)
            console.log(response)
        } catch(error) {
            return (
                <div>
                    Algo salio mal :/
                </div>
            )
        }
    }
    
    return (
        <>
            <BloqueFiltro />
            <div className="flex pt-10 justify-center bg-black relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-black max-w-6xl w-full px-4">
                    {alojamientosPagina.map((alojamientosPagina) => (
                        <BloqueAlojamiento key={alojamientosPagina.id} alojamiento={alojamientosPagina} />
                    ))}
                </div>
            </div>
        </>

    );
}

export default Home