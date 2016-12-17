const axios = require('axios');
const credentials = require('../bin/credentials');

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
  property_type=${req.query.property_type ? req.query.property_type : ''}&
  new_homes=${req.query.new_homes ? validation.booleanValidation(req.query.new_homes, credentials.zoopla.defaults.new_homes) : ''}&
  chain_free=${req.query.chain_free ? validation.booleanValidation(req.query.chain_free, credentials.zoopla.defaults.chain_free) : ''}&
  postcode=${req.query.postcode ? req.query.postcode : ''}&
  page_size=${req.query.page_size ? validation.getSearchSize(req.query.page_size) : credentials.zoopla.defaults.search_size}&
  api_key=${credentials.zoopla.api_key}`.replace(/(\n  )/g, '');
  axios
    .get (url)
    .then((response) => {
      res.status(200)
      .json({
        url: url,
        status: 'Success',
        statusCode: 200,
        message: 'Smashing',
        data: response.data
      });
    })
    .catch((err) => {
      res.status(err.response.status)
      .json({
        url: url,
        status: 'Error',
        statusCode: err.response.status,
        message: 'AHHH THERE WAS AN ERROR'
      });
    });
};

const validation = {
  booleanValidation: function(request, values){
    let test = values.filter(value => value === request);
    if (test.length === 1){
      return test[0];
    } else {
      return '';
    };
  },
  isNumber: function(request) {
    if(isNaN(request)) {
      return ''
    } else {
      return request
    };
  },
  getSearchSize: function(searchSize){
    if(searchSize && searchSize < credentials.zoopla.defaults.search_limit) {
      return searchSize;
    } else {
      return credentials.zoopla.defaults.search_limit
    }
  }
}
