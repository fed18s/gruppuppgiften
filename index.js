import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
import Animal from './lib/animal';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const animals = ['cat', 'dog', 'pokemon'];

// Setup the database
const db = new Database();
db.addCollection('cats', [
  { name: 'Fluffy', color: 'White', age: 3 },
  { name: 'Aslan', color: 'Gold', age: 11 },
  { name: 'Kitty', color: 'Grey', age: 1 },
]);


db.addCollection('dogs', []);
db.addCollection('pokemons', []);

for (let i = 0; i < animals.length; i += 1) {
  new Animal(app, db).getAnimals(animals[i]);
  new Animal(app, db).getAnimalById(animals[i]);
  new Animal(app, db).postAnimal(animals[i]);
}

// Start server

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
