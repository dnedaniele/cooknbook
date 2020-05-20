var mymap;
//IT's always returning 401 unauthorized ?:?
const EDMAM_ENDPOINT = `https://api.edamam.com/search?app_id=ae6bf7b0&app_key=f2c047350509b09ed7dc98cd15dd86d1—`;
const FOURSQUARE_ENDPOINT = `https://api.foursquare.com/v2/venues/explore?client_id=IFQ0EC04QC55WLPD00E5XPI1MP03Z4UMQEHMQR34VSUQZS2C&client_secret=LNJVMGQ0EO2J20AYFNOZE2ROEIDJM4LPS1Y5ZMU244MXLNRZ&v=20180323&limit=5`

let markerLayer;
// Adding a click event listener to all elements with a class of "searchBtn"
$(document).on("click", ".searchBtn", async function (event) {
  event.preventDefault();
  try {
    let query = $(event.target).attr("data-cuisine");
    let userLocation = await getLocation();
    var restaurants = await getRestaurants(query, userLocation);
    renderMap(restaurants, userLocation);
    const recipe = await getSingleRecipe(query);
    renderRecipe(recipe)
  } catch(err) {
    console.log(err);
  }
});

// get recipes from Edamam API

async function getSingleRecipe(query) {
  return $.ajax({
    url: `${EDMAM_ENDPOINT}&q=${query}`,
    method: "GET"
  }).then(response => response.hits[0].recipe).catch(err => console.error(err));
}

function renderRecipe(recipe) {
  $("#recipe").html(`
    <div class="card">
      <img
        src="${recipe.image}"
        class="card-img-top"
      />
      <div class="card-body">
        <h5 class="card-title">${recipe.label}</h5>
        <p class="card-body"><a href="${recipe.url}">Try it out!</a></p>
      </div>
      </div>
  `);
}

// create a Google Map on the page and display markers on it
// const GOOGLE_MAPS_JS_API = "AIzaSyDNkDcVt_FLVyQCfckYAKP2YaGrkaFdmKc";

const BERLIN_COORD = { lat: 52.52, lng: 13.405 };

var user = {};

async function getLocation() {
  return new Promise(function (resolve, reject) {
    if (!navigator.geolocation) {
      return reject('Geolocation is not supported by this browser.');
    } else {
      navigator.geolocation.getCurrentPosition(
        position => resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      );
    }
  });
}

// this function paints a google map on the page, with a labeled marker

function renderMap(arr, userLocation) {
  if (!document.querySelector("#mapid").innerHTML) {
    mymap = L.map("mapid").setView([userLocation.lat, userLocation.lng], 13);

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
  } else {
    mymap.removeLayer(markerLayer);
  }

  // Add markers from array passed as argument

  let markers = [];

  arr.forEach(element => {
    markers.push(
      L.marker([element.location.lat, element.location.lng]).bindPopup(
        `<div class="font-weight-bold">${element.name}</div>
          <div class="font-italic">${element.location.formattedAddress}</div>`
      )
    );
  });

  markerLayer = L.layerGroup(markers);
  markerLayer.addTo(mymap);
}

// list of restaurants FourSquare

async function getRestaurants(restaurantName, userLocation) {
  var restaurants = [];

  return $.ajax({
    url: `${FOURSQUARE_ENDPOINT}&ll=${userLocation.lat},${userLocation.lng}&query=${restaurantName}`,
    method: "GET"
  }).then(restList => {
    restList.response.groups[0].items.forEach(restaurant => {
      restaurants.push(restaurant.venue);
    });
    return restaurants;
  });
}