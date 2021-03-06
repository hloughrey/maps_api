const axios = require('axios');
const credentials = require('../../bin/credentials');
const validation = require('../../lib/validation/propertiesValidation');
const response_messages = require('../../lib/response_messages');

exports.getPropertyListing = function(req, res) {
  let url = `${credentials.zoopla.url}/property_listings.json?
  radius=${req.query.radius ? req.query.radius : credentials.zoopla.defaults.radius}&
  order_by=${req.query.order_by ? validation.booleanValidation(req.query.order_by, credentials.zoopla.defaults.order_by) : 'price'}&
  ordering=${req.query.ordering ? validation.booleanValidation(req.query.ordering, credentials.zoopla.defaults.ordering) : 'descending'}&
  listing_status=${req.query.listing_status ? validation.booleanValidation(req.query.listing_status, credentials.zoopla.defaults.listing_status) : ''}&
  include_sold=${req.query.include_sold ? validation.booleanValidation(req.query.include_sold, credentials.zoopla.defaults.include_sold) : ''}&
  include_rented=${req.query.include_rented ? validation.booleanValidation(req.query.include_rented, credentials.zoopla.defaults.include_rented) : ''}&
  minimum_price=${req.query.minimum_price ? validation.isNumber(req.query.minimum_price) : ''}&
  maximum_price=${req.query.maximum_price ? validation.isNumber(req.query.maximum_price) : ''}&
  minimum_beds=${req.query.minimum_beds ? validation.isNumber(req.query.minimum_beds) : ''}&
  maximum_beds=${req.query.maximum_beds ? validation.isNumber(req.query.maximum_beds) : ''}&
  furnished=${req.query.furnished ? validation.booleanValidation(req.query.furnished, credentials.zoopla.defaults.furnished) : ''}&
  property_type=${req.query.property_type ? validation.booleanValidation(req.query.property_type, credentials.zoopla.defaults.property_type) : ''}&
  new_homes=${req.query.new_homes ? validation.booleanValidation(req.query.new_homes, credentials.zoopla.defaults.new_homes) : ''}&
  chain_free=${req.query.chain_free ? validation.booleanValidation(req.query.chain_free, credentials.zoopla.defaults.chain_free) : ''}&
  postcode=${req.query.postcode ? req.query.postcode : ''}&
  page_size=${req.query.page_size ? validation.getSearchSize(req.query.page_size) : credentials.zoopla.defaults.search_size}&
  api_key=${credentials.zoopla.api_key}`.replace(/(\n  )/g, '');
  axios
    .get(url)
    .then((response) => {
      res.status(response.status)
      .json({
        status: response_messages.RESPONSES_STATUS.SUCCESS,
        message: response_messages.RESPONSES_MESSAGES.RESOURCE_FOUND,
        data: response.data
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
