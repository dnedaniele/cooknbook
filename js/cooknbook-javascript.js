// create a Google Map on the page and display markers on it

// const GOOGLE_MAPS_JS_API = "AIzaSyDNkDcVt_FLVyQCfckYAKP2YaGrkaFdmKc";

var map;

var berlin = { lat: 52.52, lng: 13.405 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: berlin,
    zoom: 13
  });
  var marker = new google.maps.Marker({
    position: { lat: 52.515884, lng: 13.401693 },
    map: map,
    label: "ESMT Coding Bootcamp"
  });
}
