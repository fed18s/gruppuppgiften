import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
import Animal from './lib/animal';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const animals = ['cat'];

// Setup the database
const db = new Database();
db.addCollection('cats', [
  { name: 'Fluffy', color: 'White', age: 3 },
  { name: 'Aslan', color: 'Gold', age: 11 },
  { name: 'Kitty', color: 'Grey', age: 1 },
]);

for(let i = 0; i < animals.length; i++){ 
  new Animal().getAnimals(app, db, animals[i]);
  new Animal().searchAnimal(app, db, animals[i]);
}

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
