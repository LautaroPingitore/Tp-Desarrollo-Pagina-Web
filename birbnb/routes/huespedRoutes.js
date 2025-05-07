import express from "express"
import { HuespedController } from "../controllers/huespedController.js"

export default function huespedRoutes(getController) {
    const router = express.Router()

    router.get("/huespedes", (req, res) => {
        getController(HuespedController).findAll(req, res)
    })

    router.post("/login/huesped", (req, res) =>
        getController(HuespedController).create(req, res)
    )

    router.delete("/huesped/:id", (req, res)=>
        getController(HuespedController).delete(req, res)
    )
    
    router.put("/huesped/:id", (req, res) =>
        getController(HuespedController).update(req, res)
    )

    return router
}