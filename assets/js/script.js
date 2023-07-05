// init variables
var $search = $('#search');
var $input = $('#input');
var $sidebar = $('#mySidebar');
// html element checkboxes
var $hotelCheck = $('#hotelCheck');
var $restaurantCheck = $('#restaurantCheck');
var $attractionCheck = $('#attractionCheck');
// card elements
var $hotel = $('#hotel');
var $restaurant = $('#restaurant');
var $attraction = $('#attraction');
// checkbox variables to be used in JavaScript
var hotelCheck;
var restaurantCheck;
var attractionCheck;
// location variable used in JavaScript
var city;
const apiKey = 'c8502ebcdb7a83fd03a62d0aaaafa07c'; // Replace with your OpenWeatherMap API key

// City object
var $save = $('#save');
var saveList = [];
var saveCity = function (cty) {
  this.city = cty;
};

$(function () {
  // Display the save list in the sidebar
  displaySaveList();

  // Autocomplete for user search input
  var autocomplete = new google.maps.places.Autocomplete($input[0], { types: ['(cities)'] });

  // Listen for 'place_changed' event
  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      city = place.formatted_address;
    }
  });

  $search.submit(function (event) {
    event.preventDefault();
    // Get city name
    city = $input.val();
    // Clear text area and give it a placeholder
    $input.val('');
    $input.attr('placeholder', 'Enter a city');
    // Call display cards
    toggleCards();
    // Display the API calls on HTML
    fetchResults();
  });

  // Store save on button click
  $save.on('click', save);
  $sidebar.on('click', '.save-item', searchAgain);
});

function searchAgain() {
  // Get the city that was pressed
  city = $(this).text();
  // Display depending on checkboxes
  toggleCards();
  // Show the results from API fetch
  fetchResults();
  // Save again (this will make the item at the top of the save list)
  save();
}

function save() {
  // This function saves the current location into local storage
  if (city == '') return;
  // Initialize array
  var saveList = [];
  // Check if the local storage has items and if it does, the saveList is the storage
  if (localStorage.getItem('saveList') !== null) {
    saveList = JSON.parse(localStorage.getItem('saveList'));
  }
  // Create a new JSON city object
  var newCity = new saveCity(city);
  // Check if city already exists
  var replace = checkRepeat(saveList, city);
  // If there is a repeat, remove it from the list from its previous position
  if (replace !== false) {
    saveList.splice(replace, 1);
  }
  // Add the object to the array
  saveList.push(newCity);
  // Set the storage with the updated array
  localStorage.setItem('saveList', JSON.stringify(saveList));
  // Update the sidebar in HTML
  displaySaveList();
}

function checkRepeat(saveList, city) {
  // Check if there is a repeat and send the index of the repeat
  var ind;
  for (var i = 0; i < saveList.length; i++) {
    if (saveList[i].city == city) {
      ind = i;
      return ind;
    }
  }
  return false;
}

function displaySaveList() {
  // This function updates the sidebar HTML
  var $btn = $('<button onclick="w3_close()" class="w3-bar-item w3-large">Close &times;</button>');
  // Remove everything in the sidebar to avoid repeats
  $sidebar.children().remove();
  // Add the close button
  $sidebar.append($btn);
  var saveList = [];
  // If the save list isn't empty
  if (localStorage.getItem('saveList') !== null) {
    // Get saved list info
    saveList = JSON.parse(localStorage.getItem('saveList'));
    // Loop until all the list items are displayed as buttons
    // Display in descending order so the latest item is on top
    for (i = saveList.length; i--; i > 0) {
      var city = saveList[i].city;
      var $a = $('<a href="#" class="save-item w3-bar-item w3-button">' + city + '</a>');
      // Add to list
      $sidebar.append($a);
    }
  }
}

function toggleCards() {
  // Get values from checkboxes
  hotelCheck = $hotelCheck.is(':checked');
  restaurantCheck = $restaurantCheck.is(':checked');
  attractionCheck = $attractionCheck.is(':checked');
  // Display cards depending on checkbox value
  $hotel.toggle(hotelCheck);
  $restaurant.toggle(restaurantCheck);
  $attraction.toggle(attractionCheck);
  // Check inputs in console
  console.log('hotel check: ' + hotelCheck);
  console.log('restaurant check: ' + restaurantCheck);
  console.log('attractions check: ' + attractionCheck);
  // Warning for when there are no checkboxes checked
  if (hotelCheck == false && restaurantCheck == false && attractionCheck == false) {
    $('#alert').show();
  } else {
    $('#alert').hide();
  }
}

// Loop for team logo video
document.getElementById('video').addEventListener('ended', myHandler, false);
function myHandler(e) {
  console.log('ended');
  setTimeout(function () {
    document.getElementById('video').play();
  }, 2000);
}

// Side bar functions
function w3_open() {
  document.getElementById('mySidebar').style.display = 'block';
}

function w3_close() {
  document.getElementById('mySidebar').style.display = 'none';
}

// API stuff
function fetchResults() {
  console.log('city in fetch Results ' + city);
  // Fetch info depending on checkboxes
  if (hotelCheck) {
    fetchPlaces(city, 'hotel');
  }
  if (restaurantCheck) {
    fetchPlaces(city, 'restaurant');
  }
  if (attractionCheck) {
    fetchPlaces(city, 'attraction');
  }
  fetchWeather(city);
}

// Fetch places depending on type using Google Places API
function fetchPlaces(city, type) {
  var request = {
    query: type + 's in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
  };
  // Reference the type card in HTML
  var $element = $('#' + type);

  var service = new google.maps.places.PlacesService(document.createElement('div'));
  // Look for the results
  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Clear existing info
      $element.empty();
      // Re-add img header
      var img = $('<img src="./assets/img/' + type + 's.png">');
      $element.append(img);
      // Loop through the results and create place cards
      var userSearch = 0; // This is to keep track of the number of results
      results.forEach(function (result) {
        if (userSearch < 5) { // Limit to X amount of results
          var card = createCard(result, type);
          $('#' + type).append(card);
          userSearch++;
        } else {
          return; // Exit the loop once X results have been added
        }
      });
    }
  });
}

// Function to create a place card element
function createCard(result, type) {
  var card = $('<div>').addClass(type + '-card');
  card.addClass('mini-card');
  var name = $('<h3>').text(result.name);
  var address = $('<p>').text(result.formatted_address);
  var rating = $('<p>').text('Rating: ' + result.rating);
  var photo = $('<img>');

  if (result.photos && result.photos.length > 0) {
    photo.attr('src', result.photos[0].getUrl({ maxWidth: 300, maxHeight: 200 }));
  } else {
    photo.attr('src', 'placeholder.jpg'); // Placeholder image if no photo available
  }

  card.append(name);
  card.append(address);
  card.append(rating);
  card.append(photo);

  return card;
}

// Fetch weather using OpenWeatherMap API
function fetchWeather(city) {
  var apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);
      // Clear existing weather info
      $('#weather').empty();
      // Loop through the forecast data and create weather cards
      var forecastList = response.list;
      for (var i = 0; i < forecastList.length; i++) {
        if (i < 14) { // Limit to 14-day forecast
          var forecast = forecastList[i];
          var card = createWeatherCard(forecast);
          $('#weather').append(card);
        } else {
          break; // Exit the loop once 14-day forecast is complete
        }
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

// Function to create a weather card element
function createWeatherCard(forecast) {
  var card = $('<div>').addClass('weather-card');
  var date = $('<p>').text('Date: ' + forecast.dt_txt);
  var temperature = $('<p>').text('Temperature: ' + forecast.main.temp);
  var description = $('<p>').text('Description: ' + forecast.weather[0].description);

  card.append(date);
  card.append(temperature);
  card.append(description);

  return card;
}
