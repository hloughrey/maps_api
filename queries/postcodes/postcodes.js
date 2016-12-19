const credentials = require('../../bin/credentials');
const response_messages = require('../../lib/response_messages');
let promise = require('bluebird');
let util = require('util');

let options = {
  promiseLib: promise
};

let pgp = require('pg-promise')(options);

let connectionString = util.format('postgres://%s:%s@%s:%s/%s',
  credentials.pgres_postcodes.username,
  credentials.pgres_postcodes.password,
  credentials.pgres_postcodes.host,
  credentials.pgres_postcodes.port,
  credentials.pgres_postcodes.database
);

console.log(connectionString);
let db = pgp(connectionString);


exports.getPostcodes = function(req, res) {
  console.log(req.params.postcode);

  db.any('SELECT * FROM postcodes.postcodes_10_16 WHERE value like ${postcode}',
    {
      postcode: String(req.params.postcode + '%') 
    }
  )
    .then(function(data) {
      res.status(200)
      .json({
        status: response_messages.RESPONSES_STATUS.SUCCESS,
        message: response_messages.RESPONSES_MESSAGES.RESOURCE_FOUND,
        data: data
      });
    })
    .catch(function(err) {
      console.log('Error: ', err);
      res.status(404)
      .json({
        status: response_messages.RESPONSES_STATUS.ERROR,
        message: response_messages.RESPONSES_MESSAGES.RESOURCE_NOT_FOUND
      });
    })
    .finally(function() {
      pgp.end();
    })
};
