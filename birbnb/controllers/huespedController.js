export class HuespedController {
  constructor(huespedService) {
    this.huespedService = huespedService;
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
      const nuevo = this.huespedService.create(huesped);

      res.status(201).json(nuevo);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      this.huespedService.delete(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nombre, email } = req.body;

      const actualizado = this.huespedService.update(id, { nombre, email });

      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }
}
