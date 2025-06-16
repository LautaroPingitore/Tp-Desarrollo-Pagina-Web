import express from "express"
import { CiudadController } from "../controllers/ciudadController.js"

export default function ciudadRoutes(getController) {
    const router = express.Router()

    router.get("/birbnb/ciudades", (req, res, next) => {
        getController(CiudadController).findAll(req, res, next)
    })

    return router
}