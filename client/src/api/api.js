import axios from "axios";
import qs from "qs";

const API_URL = "http://localhost:3000/birbnb";

export const getAlojamientos = async (pageNumber, filtros) => {
    try {
        const filtrosLimpiados = Object.fromEntries(
            Object.entries(filtros).filter(([_, v]) => {
                if (Array.isArray(v)) return v.length > 0;
                return v !== null && v !== undefined && v !== '';
            })
        );

        const response = await axios.get(`${API_URL}/alojamientos`, {
            params: {
                page: pageNumber,
                ...filtrosLimpiados
            },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" })
        });

        return response.data;
    } catch (error) {
        console.log("Algo salio mal");
        throw error;
    }
};
