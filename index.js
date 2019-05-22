import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';

import Animal from './class/animal';

import animalData from './data/animalData';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup animal types
const animalTypes = Object.keys(animalData);

// Setup the database
const db = new Database();
animalTypes.forEach((animal) => {
  db.addCollection(animal, animalData[animal]);
});

// Setup animal classes
const animalObjects = {};
animalTypes.forEach((animal) => {
  const collection = db[animal];
  const animalObject = new Animal(animal, collection);
  animalObjects[animal] = animalObject;
});

console.log(animalObjects);

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
  const newId = animalObjects.cats.add(newCat);
  return res.status(201).send({
    success: true,
    message: 'Cat added successfully',
    id: newId,
  });
});

app.get('/cats', (req, res) => {
  return res.status(200).send({
    success: true,
    data: animalObjects.cats.getAll(),
  });
});

app.get('/cat/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const cat = animalObjects.cats.getById(id);
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

app.get('/catSearch/:key/:value', (req, res) => {
  const { key, value } = req.params;
  const cat = animalObjects.cats.find(key, value);
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
