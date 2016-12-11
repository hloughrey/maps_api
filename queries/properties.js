const axios = require('axios');
const credentials = require('../bin/credentials');

module.exports = {

  getLatest: function(req, res) {
    let url = `${credentials.zoopla.url}/property_listings.json?postcode=${req.query.postcode}&page_size=${req.query.page_size}&property_type=${req.query.property_type}&api_key=${credentials.zoopla.api_key}`;
    axios
      .get (url)
      .then((response) => {
        res.status(200)
        .json({
          status: 'Success',
          message: 'Smashing',
          data: response.data
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        res.status(500)
        .json({
          status: 'Error',
          message: 'AHHH THERE WAS AN ERROR'
        });
      });
  },

};
