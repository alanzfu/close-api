function degToRadians (degrees) {
  return degrees * (Math.PI/180);
}

function twoPointDistance (coord1, coord2) {
  var deltaLat = degToRadians(coord2[0] - coord1[0]);
  var deltaLon = degToRadians(coord2[1] - coord1[1]);


  var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2)
  + Math.cos(degToRadians(coord1[0]))*Math.cos(degToRadians(coord2[0]))
  * Math.sin(deltaLon/2) * Math.sin(deltaLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = 3959*c;

  return d;
}

module.exports = function(data, lat, lon) {
  return data.filter(function (datum){
    if (twoPointDistance(datum.loc, [lat,lon]) > 50) {
      return false;
    } else {
      return true;
    }
  });
};
