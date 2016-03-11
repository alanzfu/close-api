var searchLoc = require('./utilities.js');

module.exports = function (app) {
  var data = [{
      "id" : "53fb8f26456e74467b000001",
      "loc" : [
          36.1665407118837763,
          -115.1408087193642729
      ],
      "userId" : "53f6c9c96d1944af0b00000b",
      "description" : null,
      "price" : -1,
      "status" : "removed",
      "createdAt" : "2014-08-25T19:31:50.180Z"
  },
  {
      "id" : "53fb8f81456e74467b000002",
      "loc" : [
          36.1632776369483580,
          -115.1409809579232757
      ],
      "userId" : "53f6c9c96d1944af0b00000b",
      "description" : "Cup",
      "price" : 20,
      "status" : "removed",
      "createdAt" : "2014-08-25T19:33:21.153Z"
  },
  {
      "id" : "53fbb9b6456e74467b000004",
      "loc" : [
          36.1685268205825778,
          -115.1428359463777298
      ],
      "userId" : "53f6c9c96d1944af0b00000b",
      "description" : null,
      "price" : -1,
      "status" : "removed",
      "createdAt" : "2014-08-25T22:33:26.282Z"
  },
  {
      "id" : "53fbe21c456e74467b000006",
      "loc" : [
          36.1551724788769704,
          -115.1448416183734196
      ],
      "userId" : "53f6c9c96d1944af0b00000b",
      "description" : null,
      "price" : 20,
      "status" : "removed",
      "createdAt" : "2014-08-26T01:25:48.754Z"
  },
  {
      "id" : "53fcc82a45b6f4db35000001",
      "loc" : [
          36.1685723269377419,
          -115.1440166218116872
      ],
      "userId" : "53f6c9c96d1944af0b00000b",
      "description" : null,
      "price" : -1,
      "status" : "tos",
      "createdAt" : "2014-08-26T17:47:22.885Z"
  },
  {
      "id" : "53fccf9945b6f4db3500000a",
      "loc" : [
          36.1644731140710007,
          -115.1408957812771092
      ],
      "userId" : "53fccf7545b6f4db35000007",
      "description" : "BBQ",
      "price" : 0,
      "status" : "tos",
      "createdAt" : "2014-08-26T18:19:05.321Z"
  },
  {
      "id" : "53fcf20e646d8f233e000006",
      "loc" : [
          36.1662231510807786,
          -115.1420746777390178
      ],
      "userId" : "53fccf7545b6f4db35000007",
      "description" : "How do we get on this?",
      "price" : 0,
      "status" : "tos",
      "createdAt" : "2014-08-26T20:46:06.044Z"
  },
  {
      "id" : "53fd1182646d8f233e000014",
      "loc" : [
          36.1644216946368360,
          -115.1395054988068409
      ],
      "userId" : "53f6c9c96d1944af0b00000b",
      "description" : null,
      "price" : -1,
      "status" : "removed",
      "createdAt" : "2014-08-26T23:00:18.800Z"
  },
  {
      "id" : "53fd1e48646d8f233e00001b",
      "loc" : [
          36.1655752469648633,
          -115.1420697964913131
      ],
      "userId" : "53fd1d5f646d8f233e000015",
      "description" : "Markers NOT previously chomped on.",
      "price" : -1,
      "status" : "removed",
      "createdAt" : "2014-08-26T23:54:48.754Z"
  }];
var i = 0;

// * The entire list sorted by creation date (Ascending and Descending)
// * The entire listed sorted by the item’s price (Ascending and Descending)
// * A route to request for items within 50 miles of their location coordinates
  app.get('/api/items/', function(req, res) {
    var sortby = req.query.sortBy
    var ascending = req.query.ascending
    var lat = parseFloat(req.query.lat);
    var long = parseFloat(req.query.long);

    var actions = {
      "creationdate": function () {
        console.log(data[0]);
        data = data.sort(function(a,b){
          if(ascending === "true") {
            console.log('true');
            return new Date(a.createdAt) - new Date(b.createdAt);
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }

        });
        console.log(data[0]);
        res.json(data);
      },
      "itemprice": function () {
        data.sort(function(a,b){
          if(ascending === "true") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        })
        res.json(data);
      },
      "location": function () {
        if(lat && long) {
          res.json(searchLoc(data, lat, long));
        } else {
          res.status(404).send('Invalid Lat/Long value');
        }
      }
    }

    if(actions[sortby]) {
      actions[sortby]();
    } else if (sortby === undefined) {
      res.status(404).send('Undefined query parameter');
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
