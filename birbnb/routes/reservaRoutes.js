import express from "express"
import { ReservaController } from "../controllers/reservaController.js";

export default function reservaRoutes(getController) {
  const router = express.Router()

  router.post("/:id/reservar", (req, res, next) =>
    getController(ReservaController).create(req, res, next)
  );

  router.put("/:id/reserva/", (req, res, next) =>
    getController(ReservaController).delete(req, res, next)
  );

  return router
}