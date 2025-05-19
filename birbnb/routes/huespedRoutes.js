import express from "express"
import { HuespedController } from "../controllers/huespedController.js"

export default function huespedRoutes(getController) {
    const router = express.Router()

    router.get("/huespedes", (req, res, next) => {
        getController(HuespedController).findAll(req, res, next)
    })

    router.post("/login/huesped", (req, res, next) =>
        getController(HuespedController).create(req, res, next)
    )

    router.delete("/huesped/:id", (req, res, next)=>
        getController(HuespedController).delete(req, res, next)
    )
    
    router.put("/huesped/:id", (req, res, next) =>
        getController(HuespedController).update(req, res, next)
    )

    router.put("/:id/reserva", (req, res, next) =>
        getController(HuespedController).updateReserva(req, res, next)
    )

    router.put("/:id/cancelar/:idReserva", (req, res, next) =>
        getController(HuespedController).cancelReserva(req, res, next)
    )

    return router
}