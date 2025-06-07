import express from "express"
import { AnfitrionController } from "../controllers/anfitrionController.js"

export default function anfitrionRoutes(getController) {
    const router = express.Router()

    router.get("/health", (req, res, next) => {
        res.status(200).send("OK")
    })

    router.get("/anfitriones", (req, res, next) => {
        getController(AnfitrionController).findAll(req, res, next)
    })

    router.post("/login/anfitrion", (req, res, next) =>
        getController(AnfitrionController).create(req, res, next)
    )

    router.delete("/anfitrion/:id", (req, res, next)=>
        getController(AnfitrionController).delete(req, res, next)
    )
    
    router.put("/anfitrion/:id", (req, res, next) =>
        getController(AnfitrionController).update(req, res, next)
    )

    router.put("/anfitrion/:id/confirmar/:idReserva", (req, res, next) =>
        getController(AnfitrionController).confirmarReserva(req, res, next)
    )

    router.put("/anfitrion/:id/notificaciones/:idNotificacion", (req, res, next) =>
        getController(AnfitrionController).marcarLeidaNotificacion(req, res, next)
    )

    router.get("/anfitrion/:id/notificaciones/:tipoleida", (req, res, next) =>
            getController(AnfitrionController).getNotificaciones(req, res, next)
    )
    

    return router
}