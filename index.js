import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database
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
  createAnimal(app, animal.type, animal.collection);
});

animals.forEach((animal) => {
  registerGetAnimals(app, '/' + animal.type + 's', animal.collection);
});

animals.forEach((animal) => {
  registerGetAnimalFindId(app, animal.type + 's/:id', animal.collection);
});

animals.forEach((animal) => {
  registerGetAnimalSearch(app, animal.type + 's/:key/:value' , animal.collection);
});

  // app.post('/pokemon', (req, res) => {
  //   if (!req.body.name) {
  //     console.log(req.body);
  //     return res.status(400).send({
  //       success: false,
  //       message: 'Name is required for pokemon',
  //     });
  //   }
  //   const newPokemon = req.body;
  //   const newId = db.pokemons.push(newPokemon);
  //   return res.status(201).send({
  //     success: true,
  //     message: 'Pokemon added successfully',
  //     id: newId,
  //   });
  // });

function createAnimal(app, type, collection) {
  app.post('/' + type, (req, res) => {
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

// Cats
// app.get('/cats', (req, res) => {
//   return res.status(200).send({
//     success: true,
//     data: db.cats.all(),
//   });
// });()

function registerGetAnimals(app, path, collection) {
  app.get(path, (req, res) => {
    return res.status(200).send({
      success: true,
      data: collection.all(),
    });
  });
}

// app.get('/cat/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const cat = db.cats.find({ id });
//   if (cat) {
//     return res.status(200).send({
//       success: true,
//       data: cat,
//     });
//   }
//   return res.status(404).send({
//     success: false,
//     message: 'Cat not found',
//   });
// });

function registerGetAnimalFindId(app, type, collection) {
  app.get(type + 's/:id', (req, res) => {
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

// app.get('/catSearch/:key/:value', (req, res) => {
//   const { key, value } = req.params;
//   const cat = db.cats.find({ [key]: value });
//   if (cat) {
//     return res.status(200).send({
//       success: true,
//       data: cat,
//     });
//   }
//   return res.status(404).send({
//     success: false,
//     message: 'Cat not found',
//   });
// });

function registerGetAnimalSearch(app, type, collection) {
  app.get(type + 's/:key/:value', (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
