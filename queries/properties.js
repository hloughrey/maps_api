var axios = require('axios');

module.exports = {

  getLatest: function(req, res) {
    axios
      .get ('http://api.zoopla.co.uk/api/v1/property_listings.json?postcode=L1&page_size=8&api_key=tgkmwyu33s5va3qvk39w47b6&property_type=houses')
      .then((response) => {
        // console.log(response.data);
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
