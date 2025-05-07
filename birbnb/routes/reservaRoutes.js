import express from "express"
import { ReservaController } from "../controllers/reservaController.js";

export default function reservaRoutes(getController) {
  const router = express.Router()

  router.post("/:id/reservar", (req, res) =>
    getController(ReservaController).create(req, res)
  );

  router.put("/:id/reserva/", (req, res) =>
    getController(ReservaController).delete(req, res)
  );

  return router
}