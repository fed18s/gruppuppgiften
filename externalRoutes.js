import Database from './lib/db';

// Setup the database
const db = new Database();
db.addCollection('cats', [
  { name: 'Fluffy', color: 'White', age: 3 },
  { name: 'Aslan', color: 'Gold', age: 11 },
  { name: 'Kitty', color: 'Grey', age: 1 },
]);

module.exports = (function() {
    'use strict';
    var externalRoutes = require('express').Router();

    // Setup the routes
    externalRoutes.post('/cat', (req, res) => {
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
  
  externalRoutes.get('/cats', (req, res) => {
    return res.status(200).send({
      success: true,
      data: db.cats.all(),
    });
  });
  
  externalRoutes.get('/cat/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const cat = db.cats.find({ id });
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
  
  externalRoutes.get('/catSearch/:key/:value', (req, res) => {
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

    return externalRoutes;
})();


