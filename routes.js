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
      "creationdate": function () {
        date.sort(function(a,b){
          if(ascending === "true") {
            return Date.parse(a.createdAt) - Date.parse(b.createdAt);
          } else {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
          }

        });
        res.json(date);
      },
      "itemprice": function () {
        date.sort(function(a,b){
          if(ascending === "true") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        })
        res.json(date);
      },
      "location": function () {
        if(lat && long) {
          res.json(utility.find(data, lat, long));
        } else {
          res.status(404).send('Invalid Lat/Long value');
        }
      }
    }
    if(actions[sortby]) {
      actions[sortBy]();
    } else {
      res.status(404).send('Sorry bad request');
    }
  });

  // * Any single item by its id
  app.get('/api/items/:itemId', function(req, res) {
    var itemId = req.params.itemId;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === itemId) {
        res.json(data[i]);
      }
    }
    res.status(404).send('Sorry no item with such ID');
  });

  // * An array of items based on any userId
  app.get('/api/users/:userId', function(req, res) {
    var results = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].userId === req.params.userId) {
        results.push(data[i]);
      }
    }
    res.json(results);
  });

};
