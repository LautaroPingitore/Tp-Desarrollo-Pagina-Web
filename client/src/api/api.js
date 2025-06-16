import axios from "axios"
const API_URL = "http://localhost:3000/birbnb"

export const getAlojamientos = async (pageNumber) => {
    try {
        const response = await axios.get(`${API_URL }/alojamientos`, {
            params: {page: pageNumber}
        })
        console.log(response)
        return response.data
    } catch(error) {
        console.log("Algo salio mal")
        throw error
    }
}