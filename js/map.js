
var restaurantName = 'chinese'
var userLocation = "52.520008, 13.404954"
var restCoord = [];
var places = [];


var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=IFQ0EC04QC55WLPD00E5XPI1MP03Z4UMQEHMQR34VSUQZS2C&client_secret=LNJVMGQ0EO2J20AYFNOZE2ROEIDJM4LPS1Y5ZMU244MXLNRZ&v=20180323&limit=5&ll=" + userLocation + "&query=" + restaurantName;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (restList) {

    //console.log(restList.response.groups[0].items[0].venue.location.lat);
    // console.log(restList.response.groups[0].items[0].venue.location.lng);

    restList.response.groups[0].items.forEach(restaurant => {
        restCoord.push(restaurant.venue.location.lat);

        //var restLng = $(restaurant.venue.location.lng);

        // console.log(restLat);
        // console.log(restLng);
        places.push(restaurant.venue.location)
        console.log(restaurant.venue);

        // console.log(restaurant.venue.location.lng)
    });
    console.log(places);

    // console.log(restCoord);

})