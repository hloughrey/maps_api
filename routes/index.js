const routes = require('express').Router();

const roads = require('./roads/index');
const propertyListings = require('./properties/listings');
const averageprice = require('./properties/average_price');
const postcodes = require('./postcodes/postcodes');

routes.get('/', (req, res) => {
  res.status(200).json({message: 'Connected to our API'});
});

// Roads
routes.use('/roads', roads);

// Properties
routes.use('/property/listings', propertyListings);
routes.use('/property/averageprice', averageprice);

// Postcodes
routes.use('/postcodes', postcodes);

module.exports = routes;
