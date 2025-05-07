import express from 'express';

export class Server {
  #controllers = {};
  #routes = [];
  #app;

  constructor(app, port = 3000) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json());
  }

  get app() {
    return this.#app;
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if(!controller) {
      throw new Error("Controller missing for the given route");
    }
    return controller;
  }

  configureRoutes() {
    this.#routes.forEach(r => {
      this.app.use(r(this.getController.bind(this)));
    })
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }

  addRoute(route) {
    this.#routes.push(route)
  }

}

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/health', (req, res) => {
//   res.status(200).send('OK');
// });

// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en puerto ${PORT}`);
// });