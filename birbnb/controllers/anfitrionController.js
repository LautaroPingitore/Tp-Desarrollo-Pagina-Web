export class AnfitrionController {
  constructor(anfitrionService, reservaService) {
    this.anfitrionService = anfitrionService;
    this.reservaService = reservaService
  }

  async findAll(req, res, next) {
    try {
      const { page, limit } = req.query;
      const anfitrion = await this.anfitrionService.findAll({ page, limit });

      res.json(anfitrion);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const anfitrion = req.body;
      const nuevo = await this.anfitrionService.create(anfitrion);

      res.status(201).json(nuevo);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.anfitrionService.delete(req.params.id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nombre, email } = req.body;

      const actualizado = await this.anfitrionService.update(id, { nombre, email });

      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }

  async marcarLeidaNotificacion(req, res, next) {
    try {
      const id = Number(req.params.id);
      const idNotificacion = Number(req.params.idNotificacion);

      const actualizado = await this.anfitrionService.updateNotificacionLeida(id, idNotificacion);

      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }

  async confirmarReserva(req, res, next) {
    try {
      const { id, idReserva } = req.params
  
      await this.reservaService.modificarEstado(id, idReserva, "CONFIRMADA")

      res.status(200)
    } catch(error) {
      next(error)
    }
  }

  async rechazarReserva(req, res, next) {
    try {
      const { id, idReserva } = req.params
  
      await this.reservaService.modificarEstado(id, idReserva, "RECHAZADA")

      res.status(200)
    } catch(error) {
      next(error)
    }
  }

  
  async getNotificaciones(req, res, next) {
    try {
      const { id , tipoLectura} = req.params
      const notificaciones = await this.andfitrionService.getNotificaciones(id, tipoLectura)

      res.status(200).json(notificaciones)
    } catch(error) {
      next(error)
    }
  }
}
