import express from "express"
import { ReservaController } from "../controllers/reservaController.js";

export default function reservaRoutes(getController) {
  const router = express.Router()

  router.post("/birbnb/reservar", (req, res, next) => {
    getController(ReservaController).create(req, res, next)
  })

  router.put("/birbnb/reserva/update", (req, res, next) => {
    getController(ReservaController).update(req, res, next)
  })

  router.get("/birbnb/reservas",(req,res,next) => {
    getController(ReservaController).findAll(req, res, next)
  })

  router.get("/birbnb/reservas/:id", (req, res, next) => {
    getController(ReservaController).findByUsuario(req, res, next)
  })

  return router
}