import express from "express";
import { AlojamientoController } from "../controllers/alojamientoController.js";

export default function alojamientoRoutes(getController) {
  const router = express.Router()

  router.get("/alojamientos", (req, res) => {
      getController(AlojamientoController).findAll(req, res)
  })
  
  router.get("/alojamientos/:id", (req, res) => {
    getController(AlojamientoController).findById(req, res)
  })

    // TODO: finByFilters
  
  router.post("/alojamientos", (req, res) => {
    getController(AlojamientoController).create(req, res)
  })
  
  router.delete("/alojamientos/:id", (req, res) => {
    getController(AlojamientoController).delete(req, res)
  })

  return router;
}