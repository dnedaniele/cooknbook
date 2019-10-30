var cusineType = $("#cusine-input").val() || "asian";
var queryURL = "https://api.edamam.com/search?q=" + cusineType + "&app_id=$ae6bf7b0&app_key=$f2c047350509b09ed7dc98cd15dd86d1—"
    ;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    $("#recipe-view").text(JSON.stringify(response));
    console.log(response);

});

// create a Google Map on the page and display markers on it
// const GOOGLE_MAPS_JS_API = "AIzaSyDNkDcVt_FLVyQCfckYAKP2YaGrkaFdmKc";

var map;

const BERLIN_COORD = { lat: 52.52, lng: 13.405 };

// this function returns the longitude and latitude of the user's location
// we should consider triggering this only when the user clicks on the 'search'
// button
function getUserLocation() {
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  } else {
    /* geolocation IS NOT available */
    console.log("Geolocation API not available in your browser, sorry!");
  }
}

// this function paints a google map on the page, with a labeled marker
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: BERLIN_COORD,
    zoom: 13
  });
  var marker = new google.maps.Marker({
    position: { lat: 52.515884, lng: 13.401693 },
    map: map,
    label: "ESMT Coding Bootcamp"
  });
}
