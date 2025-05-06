import { HuespedController } from "../controllers/huespedController.js"

export function registerHuespedRoutes(app, getController) {
    app.post("/login/huesped", (req, res) =>
        getController(HuespedController).create(req, res)
    )

    app.delete("/huesped/:id", (req, res)=>
        getController(HuespedController).delete(req, res)
    )
    
    app.put("/huesped/:id", (req, res) =>
        getController(HuespedController).update(req, res)
    )
}