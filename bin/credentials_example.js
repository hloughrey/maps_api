module.exports = {
  pgres_roads: {
    host: 'localhost',
    port: 5432,
    username: 'foo',
    password: 'foo',
    database: 'foo'
  },
  zoopla: {
    zoopla_url: 'api url',
    api_key: 'api key',
    defaults: {
      radius: 0.1,
      radius_max: 40,
      search_size: 10,
      search_limit: 100,
      order_by: ['price', 'age'],
      ordering: ['descending', 'ascending'],
      listing_status: ['sale', 'rent'],
      include_sold: ['0', '1'],
      include_rented: ['0', '1'],
      furnished: ['furnished', 'unfurnished', 'part-furnished'],
      new_homes: ['yes', 'no'],
      chain_free: ['yes', 'no']
    }
  },
};
