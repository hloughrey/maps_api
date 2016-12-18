const credentials = require('../../bin/credentials');

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
};

module.exports = validation;
