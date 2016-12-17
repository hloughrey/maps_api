const propertyListings = require('express').Router();
const propertyQueries = require('../../queries/properties')

propertyListings.get('/', propertyQueries.getPropertyListing);

module.exports = propertyListings;
