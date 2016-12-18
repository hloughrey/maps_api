const properties = require('express').Router();
const average_price = require('../../queries/properties/average_price');

properties.get('/', average_price.getAveragePrice);

module.exports = properties;
