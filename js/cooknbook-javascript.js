var cusineType = $("#cusine-input").val() || "asian";
var queryURL =
  "https://api.edamam.com/search?q=" +
  cusineType +
  "&app_id=$ae6bf7b0&app_key=$f2c047350509b09ed7dc98cd15dd86d1—";
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  $("#recipe-view").text(JSON.stringify(response));
  console.log(response);
});

// create a Google Map on the page and display markers on it
// const GOOGLE_MAPS_JS_API = "AIzaSyDNkDcVt_FLVyQCfckYAKP2YaGrkaFdmKc";

const BERLIN_COORD = { lat: 52.52, lng: 13.405 };

var user = {};

// this function returns the longitude and latitude of the user's location
// we should consider triggering this only when the user clicks on the 'search'
// button
function getUserLocation() {
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
      user.lat = position.coords.latitude;
      user.lng = position.coords.longitude;
      renderMapbox();
      renderMapLeaflet();
    });
  } else {
    /* geolocation IS NOT available */
    console.log("Geolocation API not available in your browser, sorry!");
  }
}

getUserLocation();

// this function paints a google map on the page, with a labeled marker
// trying Leaflet JS for maps

function renderMapLeaflet() {
  var mymap = L.map("mapid").setView([user.lat, user.lng], 13);

  L.tileLayer(
    `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoicGZkem0iLCJhIjoiY2syZDZyaXZ6MHQxbjNqcDR4Nm5jMDlkaiJ9.NfZcJYx2UKi8cUdQalfkyg"
    }
  ).addTo(mymap);

  // Add a marker at ESMT Berlin's location to test functionality

  L.marker([52.51587, 13.401432])
    .addTo(mymap)
    .bindPopup("<span class='font-weight-bold'>ESMT Berlin</span><br> The business school founded by business.")
    .openPopup();
}

// Also trying Mapbox GL JS

function renderMapbox() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicGZkem0iLCJhIjoiY2syZDZyaXZ6MHQxbjNqcDR4Nm5jMDlkaiJ9.NfZcJYx2UKi8cUdQalfkyg";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v9?optimize=true",
    center: [user.lng, user.lat],
    zoom: 12
  });
}
