var cusineType = $("#cusine-input").val() || "european";
// Initial array of cusine types
var cusineTypes = ["asian cusine", "european cusine", "middle eastern cusine", "mediterreanean cusine", "north american cusine", "south american cusine"];


// Adding a click event listener to all elements with a class of "searchBtn"
$(document).on("click", ".searchBtn", function (event) {
    event.preventDefault();

    var queryURL = "https://api.edamam.com/search?q=" + event.target.id + "&app_id=$ae6bf7b0&app_key=$f2c047350509b09ed7dc98cd15dd86d1—";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        console.log(response);

        var recipeDiv = $("<div class='recipe'>");



        // Storing the recipe data
        var recipe = response.hits[0].recipe;

        // Creating an element to have the recipe displayed
        var re = $("<h3>").text("Recipe: " + recipe.label);

        // Displaying the rating


        // Retrieving the URL for the image
        var imgURL = recipe.image;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        recipeDiv.append(image);
        recipeDiv.append(re);



        $("#recipe").html(recipeDiv);
    });


    console.log(event.target.id)

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
        navigator.geolocation.getCurrentPosition(function (position) {
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

// list of restaurants

var restaurantName = 'chinese'
var userLocation = "52.520008, 13.404954"


var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=IFQ0EC04QC55WLPD00E5XPI1MP03Z4UMQEHMQR34VSUQZS2C&client_secret=LNJVMGQ0EO2J20AYFNOZE2ROEIDJM4LPS1Y5ZMU244MXLNRZ&v=20180323&limit=5&ll=" + userLocation + "&query=" + restaurantName;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (restList) {
    console.log(restList);
});
