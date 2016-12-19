const postcodes = require('express').Router();
const postcodeQueries = require('../../queries/postcodes/postcodes');

postcodes.get('/:postcode', postcodeQueries.getPostcodes);


module.exports = postcodes;
