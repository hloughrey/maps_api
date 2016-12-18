const credentials = require('../../bin/credentials');
const response_messages = require('../../lib/response_messages');
let promise = require('bluebird');
let util = require('util');

let options = {
  promiseLib: promise
};

let pgp = require('pg-promise')(options);

let connectionString = util.format('postgres://%s:%s@%s:%s/%s',
  credentials.pgres_roads.username,
  credentials.pgres_roads.password,
  credentials.pgres_roads.host,
  credentials.pgres_roads.port,
  credentials.pgres_roads.database
);
let db = pgp(connectionString);


module.exports = {

  getRoad: function(req, res, next) {
    db.one('SELECT * FROM roads.roads WHERE id = ${roadID}',
      {
        roadID: parseInt(req.params.id)
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
        res.status(404)
        .json({
          status: response_messages.RESPONSES_STATUS.ERROR,
          message: response_messages.RESPONSES_MESSAGES.RESOURCE_NOT_FOUND
        })
      })
      .finally(function() {
        pgp.end();
      });
  },

  getRoads: function(req, res, next) {
    let _bbox = req.params.bbox.split(',');
    let bbox = _bbox.map((coord) => {
      let _coord = parseFloat(coord);
      if(!isNaN(_coord)) {
        return _coord
      } else {
        return null
      }
    });
    if (bbox.length === 4 && bbox.indexOf(null) === -1) {
      db.any('SELECT * FROM roads.roads WHERE ST_Intersects(geom, ST_MakeEnvelope(${minX}, ${minY}, ${maxX}, ${maxY}, 27700))',
        {
          minX: bbox[0],
          minY: bbox[1],
          maxX: bbox[2],
          maxY: bbox[3]
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
    }
    else {
      res.status(404)
      .json({
        status: response_messages.RESPONSES_STATUS.ERROR,
        message: response_messages.RESPONSES_MESSAGES.PARAMETER_ERROR
      });
    }
  },

  getRoadsByStatus: function(req, res, next) {
    let _bbox = req.params.bbox.split(',');
    let bbox = _bbox.map((coord) => {
      let _coord = parseFloat(coord);
      if(!isNaN(_coord)) {
        return _coord
      } else {
        return null
      }
    });
    if (bbox.length === 4 && bbox.indexOf(null) === -1) {
      db.any('SELECT * FROM roads.roads WHERE ST_Intersects(geom, ST_MakeEnvelope(${minX}, ${minY}, ${maxX}, ${maxY}, 27700)) AND open = ${open}',
        {
          minX: bbox[0],
          minY: bbox[1],
          maxX: bbox[2],
          maxY: bbox[3],
          open: req.params.open
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
    } else {
      res.status(400)
      .json({
        status: response_messages.RESPONSES_STATUS.ERROR,
        message: response_messages.RESPONSES_MESSAGES.PARAMETER_ERROR
      });
    }
  },

  updateRoad: function(req, res, next) {
    db.one('UPDATE roads.roads SET open=${roadStatus}, notes=${roadNotes} WHERE id = ${roadID} RETURNING id',
      {
        roadID: parseInt(req.params.id),
        roadStatus: (req.query.open),
        roadNotes: (req.query.notes)
      }
    )
      .then(function(data) {
        res.status(200)
          .json({
            status: response_messages.RESPONSES_STATUS.SUCCESS,
            message: response_messages.RESPONSES_MESSAGES.RESOURCE_FOUND
          });
      })
      .catch(function(err) {
        res.status(400)
        .json({
          status: response_messages.RESPONSES_STATUS.ERROR,
          message: response_messages.RESPONSES_MESSAGES.RESOURCE_NOT_FOUND
        });
      });
  }
};
