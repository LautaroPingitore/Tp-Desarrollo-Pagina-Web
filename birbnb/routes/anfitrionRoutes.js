import { AnfitrionController } from "../controllers/anfitrionController.js"

export function registerAnfitrionRoutes(app, getController) {
    app.post("/login/anfitrion", (req, res) =>
        getController(AnfitrionController).create(req, res)
    )

    app.delete("/huesped/:id", (req, res)=>
        getController(AnfitrionController).delete(req, res)
    )
    
    app.put("/huesped/:id", (req, res) =>
        getController(AnfitrionController).update(req, res)
    )
}