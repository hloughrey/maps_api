const axios = require('axios');
const credentials = require('../bin/credentials');

exports.getLatest = function(req, res) {
  let url = `${credentials.zoopla.url}/property_listings.json?
  postcode=${req.query.postcode ? req.query.postcode : ''}&
  radius=${req.query.radius ? req.query.radius : credentials.zoopla.defaults.radius}&
  minimum_beds=${req.query.minimum_beds ? req.query.minimum_beds : ''}&
  page_size=${getSearchSize(req.query.page_size)}&
  property_type=${req.query.property_type ? req.query.property_type : ''}&
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

const getSearchSize = function(searchSize){
  console.log('I WAS CALLLED');
  if(searchSize && searchSize < credentials.zoopla.defaults.search_limit) {
    return searchSize;
  } else {
    return credentials.zoopla.defaults.search_limit
  }
};
