const routes = require('express').Router();

const roads = require('./roads/index');
const propertyListings = require('./property_listings/index');

routes.get('/', (req, res) => {
  res.status(200).json({message: 'Connected to our API'});
});

// Roads
routes.use('/roads', roads);

// Properties
routes.use('/propertyListings', propertyListings);

module.exports = routes;
