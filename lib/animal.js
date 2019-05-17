// Setup the routes
class Animal{
  
  postAnimal(animal){
  app.post('/${animal}', (req, res) => {
      if (!req.body.name) {
        console.log(req.body);
        return res.status(400).send({
          success: false,
          message: 'Name is required for cat',
        });
      }
      const newCat = req.body;
      const newId = db.cats.push(newCat);
      return res.status(201).send({
        success: true,
        message: 'Cat added successfully',
        id: newId,
      });
    });
  }

  getAnimals(app, db, animal){
    const plural = animal + 's';
    app.get('/'+plural, (req, res) => {
      return res.status(200).send({
        success: true,
        data: db[plural].all(),
      });
    });
  
    app.get('/'+animal+'/:id', (req, res) => {
      const id = parseInt(req.params.id, 10);
      const animal = db.plural.find({ id });
      if (animal) {
        return res.status(200).send({
          success: true,
          data: animal,
        });
      }
      return res.status(404).send({
        success: false,
        message: animal+ ' not found',
      });
    });
  }
  
  searchAnimal(){
    app.get('/catSearch/:key/:value', (req, res) => {
      const { key, value } = req.params;
      const cat = db.cats.find({ [key]: value });
      if (cat) {
        return res.status(200).send({
          success: true,
          data: cat,
        });
      }
      return res.status(404).send({
        success: false,
        message: 'Cat not found',
      });
    });
  }

}

export default Animal;