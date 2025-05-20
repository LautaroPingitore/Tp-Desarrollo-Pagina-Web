import express from "express";
import { AlojamientoController } from "../controllers/alojamientoController.js";

export default function alojamientoRoutes(getController) {
  const router = express.Router()

  router.get("/alojamientos", (req, res, next) => {
      getController(AlojamientoController).findAll(req, res, next)
  })
  
  router.get("/alojamientos/:id", (req, res, next) => {
    getController(AlojamientoController).findById(req, res, next)
  })
  
  router.post("/alojamientos", (req, res, next) => {
    getController(AlojamientoController).create(req, res, next)
  })
  
  router.delete("/alojamientos/:id", (req, res, next) => {
    getController(AlojamientoController).delete(req, res, next)
  })

  return router;
}