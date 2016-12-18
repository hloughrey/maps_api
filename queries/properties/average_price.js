const axios = require('axios');
const credentials = require('../../bin/credentials');
const validation = require('../../lib/validation/propertiesValidation');
const response_messages = require('../../lib/response_messages');

exports.getAveragePrice = function(req, res) {
  let url = `${credentials.zoopla.url}/property_listings.json?
  radius=${req.query.radius ? req.query.radius : credentials.zoopla.defaults.radius}&
  listing_status=${req.query.listing_status ? validation.booleanValidation(req.query.listing_status, credentials.zoopla.defaults.listing_status) : ''}&
  minimum_beds=${req.query.minimum_beds ? validation.isNumber(req.query.minimum_beds) : ''}&
  maximum_beds=${req.query.maximum_beds ? validation.isNumber(req.query.maximum_beds) : ''}&
  furnished=${req.query.furnished ? validation.booleanValidation(req.query.furnished, credentials.zoopla.defaults.furnished) : ''}&
  property_type=${req.query.property_type ? validation.booleanValidation(req.query.property_type, credentials.zoopla.defaults.property_type) : ''}&
  postcode=${req.query.postcode ? req.query.postcode : ''}&
  page_size=${credentials.zoopla.defaults.search_limit}&
  api_key=${credentials.zoopla.api_key}`.replace(/(\n  )/g, '');
  axios
    .get(url)
    .then((response) => {
      res.status(response.status)
      .json({
        status: response_messages.RESPONSES_STATUS.SUCCESS,
        message: response_messages.RESPONSES_MESSAGES.RESOURCE_FOUND,
        data: {
          propertyCount: response.data.result_count,
          averagePrice: calculateAverage(response.data, req.query.listing_status)
        }
      });
    })
    .catch((err) => {
      res.status(err.response.status)
      .json({
        status: response_messages.RESPONSES_STATUS.ERROR,
        message: response_messages.RESPONSES_MESSAGES.RESOURCE_NOT_FOUND
      });
    });
};

const calculateAverage = function(data, listingStatus) {
  let propertyCount = data.result_count,
      sumPrices;
  if(listingStatus === 'rent') {
    sumPrices = data.listing
      .map(property => property.rental_prices.per_month)
      .reduce((prev, value) => (prev || 0) + value);
  } else {
    sumPrices = data.listing
      .map(property => parseInt(property.price))
      .reduce((prev, value) => (prev || 0) + value);
  }
  return (sumPrices / propertyCount);
};
