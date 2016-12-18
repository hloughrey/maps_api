const properties = require('express').Router();
const property_listings = require('../../queries/properties/listings');

properties.get('/', property_listings.getPropertyListing);

module.exports = properties;
