import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
import Data from './animalData.js';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database
const db = new Database();
db.addCollection('cats', Data.cat);
db.addCollection('pokemons', Data.pokemon);
db.addCollection('dogs', Data.dog);

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

// type = cat/dog/pokemon
// app = hela applikationen
// collection = db.cats/db.pokemons/db.dogs
function registerGetAnimals(type, app, collection) {
  app.get('/'+type+'s', (req, res) => {
    return res.status(200).send({
      success: true,
      data: collection.all(),
    });
  });
}

function registerGetAnimalId(type, app, collection){
  app.get('/'+type+'/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const animal = collection.find({ id });
    if (animal) {
      return res.status(200).send({
        success: true,
        data: animal,
      });
    }
    return res.status(404).send({
      success: false,
      message: type.upperCaseFirst()+' not found',
    });
  });
}

[
  {type: 'cat', collection: db.cats},
  {type: 'dog', collection: db.dogs},
  {type: 'pokemon', collection: db.pokemons},
].forEach((animal) => {
  registerGetAnimals(animal.type, app, animal.collection);
  registerGetAnimalId(animal.type, app, animal.collection);
});

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

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
