//DISCLOSURE: Most of this code was taken from a homework assignment.  This is largely from the Butler Data and Analytics course, modified to meet the homework requirments

// Storing the API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"
  
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data);
});

function createFeatures(earthquakeData) {

   // Give each feature a popup describing the place, time, Magnitude, and Depth of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + "Magnitude: " + (feature.properties.mag) + "</p>" +
      "</h3><hr><p>" + "Depth: " + (feature.geometry.coordinates[2]) + "</p>" +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
      );
      
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap, center loading point, and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

// Attempt to add an icon with fixed size
//   // Set the icon size by maginitude values
//   var mapIcon = L.icon({
//        iconSize:     [38, 95], // size of the icon
//     // shadowSize:   [50, 64], // size of the shadow
//     // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     // shadowAnchor: [4, 62],  // the same for the shadow
//     // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

// mapIcon.addTo(myMap);


}
