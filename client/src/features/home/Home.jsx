import BloqueFiltro from "../../components/filtros/bloqueFiltro/BloqueFiltros"
import BloqueAlojamiento from "../../components/bloqueAlojamientos/bloqueAlojamientos"
import { useState, useEffect } from "react"
import {getAlojamientos} from "../../api/api.js"

const Home = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [filtros, setFiltros] = useState({ 
        ciudad: null,
        fechaEntrada: null,
        fechaSalida: null,
        cantidadHuespedes: 1,
        precioMax: null,
        caracteristicas: null
    })
    const [alojamientosPagina, setAlojamientosPagina] = useState([])

    useEffect(() => {
        cargarAlojamientos()
    }, [pageNumber, filtros])


    const cargarAlojamientos = async () => {
        try {
            console.log(`Cargando alojamientos de la página ${pageNumber}`)
            const response = await getAlojamientos(pageNumber, filtros)
            setAlojamientosPagina(response.data)
            setTotalPages(response.totalPages)
            if (response.page !== pageNumber) {
                setPageNumber(response.page);
                }
            console.log(response)
            console.log(filtros)
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
            <BloqueFiltro filtros={filtros} setFiltros={setFiltros} />
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