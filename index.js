import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';


const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const db = new Database();
db.addCollection('cats', [
  { name: 'Fluffy', color: 'White', age: 3 },
  { name: 'Aslan', color: 'Gold', age: 11 },
  { name: 'Kitty', color: 'Grey', age: 1 },
]);

db.addCollection('dogs', [
  { name: 'Pluto', color: 'Beige', age: 7 },
  { name: 'Rex', color: 'Gold', age: 4 },
  { name: 'Kex', color: 'Grey', age: 2 },
]);

db.addCollection('pokemons', [
  { name: 'Pikachu', color: 'Beige', age: 7 },
  { name: 'Squirtle', color: 'Gold', age: 4 },
  { name: 'Slowpoke', color: 'Grey', age: 2 },
]);

const animals = [
  {type: 'cat', collection: db.cats},
  {type: 'dog', collection: db.dogs},
  {type: 'pokemon', collection: db.pokemons}
];

animals.forEach((animal) => {
  createAnimal(app, '/' + animal.type, animal.collection);
});

animals.forEach((animal) => {
  registerGetAnimals(app, '/' + animal.type + 's', animal.collection);
});

animals.forEach((animal) => {
  registerGetAnimalFindId(app, '/' + animal.type + '/:id', animal.collection);
});

animals.forEach((animal) => {
  registerGetAnimalSearch(app, '/' + animal.type + 'Search/:key/:value', animal.collection);
});


function createAnimal(app, type, collection) {
  app.post(type, (req, res) => {
      if (!req.body.name) {
        console.log(req.body);
        return res.status(400).send({
          success: false,
          message: 'Name is required for ' + type,
        });
      }
      const newAnimal = req.body;
      const newId = collection.push(newAnimal);
      return res.status(201).send({
        success: true,
        message: type + ' added successfully',
        id: newId,
      }); 
  });
}


function registerGetAnimals(app, type, collection) {
  app.get(type, (req, res) => {
    return res.status(200).send({
      success: true,
      data: collection.all(),
    });
  });
}


function registerGetAnimalFindId(app, type, collection) {
  app.get(type, (req, res) => {
    const id = parseInt(req.params.id, 10);
    const type = collection.find({ id });
    if (type) {
      return res.status(200).send({
        success: true,
        data: type,
      });
    }
    return res.status(404).send({
      success: false,
      message: type + ' not found',
    });
  });
}


function registerGetAnimalSearch(app, type, collection) {
  app.get(type, (req, res) => {
    const { key, value } = req.params;
      const type = collection.find({ [key]: value });
      if (type) {
        return res.status(200).send({
          success: true,
          data: type,
        });
      }
      return res.status(404).send({
        success: false,
        message: type + ' not found',
      });
  });
}


app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
