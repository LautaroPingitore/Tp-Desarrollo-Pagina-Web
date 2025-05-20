import express from "express"
import { ReservaController } from "../controllers/reservaController.js";

export default function reservaRoutes(getController) {
  const router = express.Router()

  router.post("/reservas", (req, res, next) => {
    getController(ReservaController).create(req, res, next)
  })

  router.put("/reserva/update", (req, res, next) => {
    getController(ReservaController).update(req, res, next)
  })

  router.get("/reservas",(req,res,next) => {
    getController(ReservaController).findAll(req, res, next)
  })
  return router
}