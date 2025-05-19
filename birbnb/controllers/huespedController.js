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
      const id = Number(req.params.id);
      await this.huespedService.delete(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nombre, email } = req.body;

      const actualizado = await this.huespedService.update(id, { nombre, email });

      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }

  async updateReserva(req, res, next) {
    try {
      const id = req.query
      const reservaModif = req.body

      const nuevaReserva = await this.reservaService.update(reservaModif, id)

      res.json(nuevaReserva)
    } catch(error) {
      next(error)
    }
  }

  async cancelReserva(req, res, next) {
    try {
      const id = req.query.id
      const idReserva = req.query.idReserva
  
      await this.reservaService.updateEstado(id, idReserva, "CANCELADA")

      res.status(200)
    } catch(error) {
      next(error)
    }
  }
}
