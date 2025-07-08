import express from "express";
import { AlojamientoController } from "../controllers/alojamientoController.js";

export default function alojamientoRoutes(getController) {
  const router = express.Router()

  router.get("/birbnb/alojamientos", (req, res, next) => {
      getController(AlojamientoController).findAll(req, res, next)
  })
  
  router.get("/birbnb/alojamientos/:id", (req, res, next) => {
    getController(AlojamientoController).findById(req, res, next)
  })
  
  router.post("/birbnb/alojamientos", (req, res, next) => {
    getController(AlojamientoController).create(req, res, next)
  })
  
  router.delete("/birbnb/alojamientos/:id", (req, res, next) => {
    getController(AlojamientoController).delete(req, res, next)
  })

  router.post("/birbnb/alojamientos/array", (req, res, next) => {
    getController(AlojamientoController).importArray(req, res, next)
  })

  router.put("/birbnb/alojamientos/anfitrion", (req, res, next) => {
    getController(AlojamientoController).getByAnfitrion(req, res, next)
  })

  return router;
}