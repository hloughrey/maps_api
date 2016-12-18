const axios = require('axios');
const credentials = require('../../bin/credentials');
const response_messages = require('../../lib/response_messages');

exports.getAveragePrice = function(req, res) {
  console.log(req.query);
  // console.log(res);
  res.status(200)
  .json({
    status: response_messages.RESPONSES_STATUS.SUCCESS,
    message: response_messages.RESPONSES_MESSAGES.RESOURCE_FOUND
  });
};
