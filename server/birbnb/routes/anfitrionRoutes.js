import express from "express"
import { AnfitrionController } from "../controllers/anfitrionController.js"

export default function anfitrionRoutes(getController) {
    const router = express.Router()

    router.get("/birbnb/anfitriones", (req, res, next) => {
        getController(AnfitrionController).findAll(req, res, next)
    })

    router.post("/birbnb/login/anfitrion", (req, res, next) => {
        getController(AnfitrionController).logIn(req, res, next)
    })

    router.post("/birbnb/signin/anfitrion", (req, res, next) =>
        getController(AnfitrionController).create(req, res, next)
    )

    router.delete("/birbnb/anfitrion/:id", (req, res, next)=>
        getController(AnfitrionController).delete(req, res, next)
    )
    
    router.put("/birbnb/anfitrion/:id", (req, res, next) =>
        getController(AnfitrionController).update(req, res, next)
    )

    router.put("/birbnb/anfitrion/:id/confirmar/:idReserva", (req, res, next) =>
        getController(AnfitrionController).confirmarReserva(req, res, next)
    )

    router.put("/birbnb/anfitrion/:id/notificaciones/:idNotificacion", (req, res, next) =>
        getController(AnfitrionController).marcarLeidaNotificacion(req, res, next)
    )

    router.get("/birbnb/anfitrion/:id/notificaciones/:tipoleida", (req, res, next) =>
            getController(AnfitrionController).getNotificaciones(req, res, next)
    )
    

    return router
}