import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';

import Animal from './class/animal';
import AnimalRoutes from './class/animalRoutes';

import animalData from './data/animalData';

// Setup the server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Setup animal types
const animalTypes = Object.keys(animalData);

// Setup the database
const db = new Database();
animalTypes.forEach((animal) => {
  db.addCollection(animal, animalData[animal]);
});

// Setup animal classes
animalTypes.forEach((animal) => {
  const collection = db[animal];
  const animalObject = new Animal(animal, collection);
  const animalRoute = new AnimalRoutes(animalObject, app);
  animalRoute.initRoutes();
});

export default app;
