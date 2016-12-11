const propertyListings = require('express').Router();
const propertyQueries = require('../../queries/properties')

propertyListings.get('/', propertyQueries.getLatest);

module.exports = propertyListings;
