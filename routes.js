var utilities = require('./utilities.js');

module.exports = function (app) {

// * The entire list sorted by creation date (Ascending and Descending)
// * The entire listed sorted by the item’s price (Ascending and Descending)
// * A route to request for items within 50 miles of their location coordinates
  app.get('/api/items/', function(req, res) {
    var sortby = req.params.sortBy.toLowerCase();
    var ascending = req.params.ascending.toLowerCase();
    var lat = parseFloat(req.params.lat);
    var long = parseFloat(req.params.long);

    var actions = {
      "creationdate": function () {},
      "itemprice": function () {},
      "location": function () {}
    }

    actions[sortBy]();
  });

  // * Any single item by its id
  app.get('/api/items/:item_id', function(req, res) {

  });

  // * An array of items based on any userId
  app.get('/api/users/:user_id', function(req, res) {

  });

};
