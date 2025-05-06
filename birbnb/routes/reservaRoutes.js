
export function registerReservaRoutes(app, getController) {
      app.post("/:id/reservar", (req, res) =>
        getController(ResrvaControoller).create(req, res)
      );
    
      app.put("/:id/reserva/", (req, res) =>
        getController(ResrvaController).delete(req, res)
      );
}