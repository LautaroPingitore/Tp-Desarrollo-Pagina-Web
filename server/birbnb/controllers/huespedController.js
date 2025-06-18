export class HuespedController {
  constructor(huespedService, reservaService) {
    this.huespedService = huespedService
    this.reservaService = reservaService
  }

  async findAll(req, res, next) {
    try {
      const { page, limit } = req.query;
      const huesped = await this.huespedService.findAll({ page, limit });

      res.json(huesped);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const huesped = req.body;
      const nuevo = await this.huespedService.create(huesped);

      res.status(201).json(nuevo);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.huespedService.delete(req.params.id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const { nombre, email } = req.body;

      const actualizado = await this.huespedService.update(id, { nombre, email });

      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }

async marcarLeidaNotificacion(req, res, next) {
    try {
      const { id, idNotificacion} = req.params

      const actualizado = await this.huespedService.updateNotificacionLeida(id, idNotificacion);

      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }

  async updateReserva(req, res, next) {
    try {
      const { id, idNotificacion} = req.params

      const nuevaReserva = await this.reservaService.update(reservaModif, id)

      res.json(nuevaReserva)
    } catch(error) {
      next(error)
    }
  }
 
  async cancelReserva(req, res, next) {
    try {
      const { id, idReserva} = req.params

      const motivo = req.body && req.body.motivo ? req.body.motivo : null;
  
      await this.reservaService.modificarEstado(id, idReserva, "CANCELADA", motivo);
    
      res.status(200)
    } catch(error) {
      next(error)
    }
  }

  async getNotificaciones(req, res, next) {
    try {
      const { id, leida } = req.params

      const notificaciones = await this.huespedService.getNotificaciones(id, leida)

      res.json(notificaciones)
    } catch(error) {
      next(error)
    }
  }
}
