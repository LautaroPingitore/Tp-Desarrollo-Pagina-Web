import express from "express"
import { AnfitrionController } from "../controllers/anfitrionController.js"

export default function anfitrionRoutes(getController) {
    const router = express.Router()

    router.get("/health", (req, res) => {
        res.status(200).send("OK")
    })

    router.get("/anfitriones", (req, res) => {
        getController(AnfitrionController).findAll(req, res)
    })

    router.post("/login/anfitrion", (req, res) =>
        getController(AnfitrionController).create(req, res)
    )

    router.delete("/anfitrion/:id", (req, res)=>
        getController(AnfitrionController).delete(req, res)
    )
    
    router.put("/anfitrion/:id", (req, res) =>
        getController(AnfitrionController).update(req, res)
    )

    return router
}