
var restaurantName = 'chinese'
var userLocation = "52.520008, 13.404954"


var queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=IFQ0EC04QC55WLPD00E5XPI1MP03Z4UMQEHMQR34VSUQZS2C&client_secret=LNJVMGQ0EO2J20AYFNOZE2ROEIDJM4LPS1Y5ZMU244MXLNRZ&v=20180323&limit=5&ll=" + userLocation + "&query=" + restaurantName;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (restList) {
    console.log(restList);


    // var textMovie = $('<p>').text(JSON.stringify(response))
    // $("body").append(textMovie)

})