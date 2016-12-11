const roads = require('express').Router();
const roadQueries = require('../../queries/roads');


roads.get('/:id', roadQueries.getRoad);
roads.post('/:bbox', roadQueries.getRoads);
// TODO: Write tests for this route
roads.post('/:bbox/:open', roadQueries.getRoadsByStatus);
roads.put('/:id', roadQueries.updateRoad);

module.exports = roads;
