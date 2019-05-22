import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
import mockData from './mockData';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database
const db = new Database();
db.addCollection('cats', mockData.cats);
db.addCollection('dogs', mockData.dogs);
db.addCollection('pokemons', mockData.pokemons);

// Setup the routes
app.post('/cat', (req, res) => {
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

class Animals {
  constructor(type, collection, app) {
    this.type = type;
    this.collection = collection;
    this.app = app;
  }

  registerPostCreature(type, app, collection) {
    // Setup the routes
    app.post('/' + type, (req, res) => {
      if (!req.body.name) {
        console.log(req.body);
        return res.status(400).send({
          success: false,
          message: 'Name is required for ' + type,
        });
      }
      const newCreature = req.body;
      const newId = collection.push(newCreature);
      return res.status(201).send({
        success: true,
        message: type + ' added successfully',
        id: newId,
      });
    });
  }

  getAllAnimals() {
    const path = `/${this.type}s`;
  
    this.app.get(path, (req, res) => res.status(200).send({
      success: true,
      data: db[`${this.type}s`].all()
    }));
  }

  getAnimalId() {
    const path = `/${this.type}/:id`;

    this.app.get(path, (req, res) => {
      const id = +req.params.id;
      const Idresult = db[`${this.type}s`].all().find(obj => obj.id === id);
      if (Idresult) {
        return res.status(200).send({
          success: true,
          data: Idresult,
        });
      }
      return res.status(404).send({
        success: false,
        message: `${this.type} could not be found`,

      });
    });
  }

  getAnimalSearch() {
    const path = `/${this.type}s/:key/:value`;
    this.app.get(path, (req, res) => {
      const { key, value } = req.params;
      const animalResult = db[`${this.type}s`].find({ [key]: value });
      if (animalResult) {
        return res.status(200).send({
          success: true,
          data: animalResult,
        });
      }
      return res.status(404).send({
        success: false,
        message: `could not find ${this.type}s`,
      });
    });
  }
}

const cat = new Animals('cat', db.cats, app);
cat.getAllAnimals();
cat.getAnimalSearch();
cat.getAnimalId();


const dog = new Animals('dog', db.dogs, app);
dog.getAllAnimals();
dog.getAnimalSearch();
dog.getAnimalId();

const pokemon = new Animals('pokemon', db.pokemons, app);
pokemon.getAllAnimals();
pokemon.getAnimalSearch();
pokemon.getAnimalId();


// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});