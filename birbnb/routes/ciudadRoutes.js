import express from "express"
import { CiudadController } from "../controllers/ciudadController.js"

export default function ciudadRoutes(getController) {
    const router = express.Router()

    router.get("/ciudades", (req, res) => {
        getController(CiudadController).findAll(req, res)
    })

    return router
}