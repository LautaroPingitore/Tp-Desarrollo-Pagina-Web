import { AlojamientoController } from "../controllers/alojamientoController";

export function registerAlojamientoRoutes(app, getController) {
    app.get("/alojamientos", (req, res) =>
        getController(AlojamientoController).findAll(req, res)
      );
    
      app.get("/alojamientos/:id", (req, res) =>
        getController(AlojamientoController).findById(req, res)
      );

      // TODO: finByFilters
    
      app.post("/alojamientos", (req, res) =>
        getController(AlojamientoController).create(req, res)
      );
    
      app.delete("/alojamientos/:id", (req, res) =>
        getController(AlojamientoController).delete(req, res)
      );
}