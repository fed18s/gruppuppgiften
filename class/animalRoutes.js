export default class AnimalRoutes {
  constructor(animal, app) {
    this.animal = animal;
    this.app = app;

    // Run-methods are added as arrow-functions in order to maintain binding
    // to the "this" property of the object. This is their special purpose in
    // Javascript

    this.runGetAll = (req, res) => res.status(200).send({
      success: true,
      data: this.animal.getAll(),
    });

    this.runGetById = (req, res) => {
      const id = parseInt(req.params.id, 10);
      const data = animal.getById(id);
      if (data) {
        return res.status(200).send({
          success: true,
          data,
        });
      }
      return res.status(404).send({
        success: false,
        message: `${this.animal.getType()} not found`,
      });
    };

    this.runSearch = (req, res) => {
      const { key, value } = req.params;
      const data = this.animal.find(key, value);
      if (data) {
        return res.status(200).send({
          success: true,
          data,
        });
      }
      return res.status(404).send({
        success: false,
        message: `${this.animal.getType()} not found`,
      });
    };

    this.runAddAnimal = (req, res) => {
      if (!req.body.name) {
        console.log(req.body);
        return res.status(400).send({
          success: false,
          message: `Name is required for ${this.animal.getType()}`,
        });
      }
      const data = req.body;
      const newId = this.animal.add(data);
      return res.status(201).send({
        success: true,
        message: `${this.animal.getType()} added successfully`,
        id: newId,
      });
    };
  }

  registerGetAll() {
    this.app.get(`/${this.animal.getType()}s`, this.runGetAll);
  }

  registerGetById() {
    this.app.get(`/${this.animal.getType()}/:id`, this.runGetById);
  }

  registerSearch() {
    this.app.get(`/${this.animal.getType()}/:key/:value`, this.runSearch);
  }

  registerPostAnimal() {
    this.app.post(`/${this.animal.getType()}`, this.runAddAnimal);
  }

  initRoutes() {
    this.registerGetAll();
    this.registerGetById();
    this.registerSearch();
    this.registerPostAnimal();
  }
}
