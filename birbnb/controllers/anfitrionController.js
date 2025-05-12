export class AnfitrionController {
  constructor(anfitrionService) {
    this.anfitrionService = anfitrionService;
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
      const nuevo = this.anfitrionService.create(anfitrion);

      res.status(201).json(nuevo);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      this.anfitrionService.delete(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nombre, email } = req.body;

      const actualizado = this.anfitrionService.update(id, { nombre, email });

      res.json(actualizado);
    } catch (error) {
      next(error);
    }
  }
}
