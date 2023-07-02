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
const apiKey = 'c8502ebcdb7a83fd03a62d0aaaafa07c';

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


function save()
{
    //this function saves the current loaction into the local stroage
    if(city == '')
        return;
    //init array
    var saveList = [];
    //checks if the local storage has stuff and if it does the save List is the storage
    if (localStorage.getItem('saveList') !== null) 
    {
        saveList = JSON.parse(localStorage.getItem("saveList"));
    }
    //create new JSON city object
    var newCity = new saveCity(city);
    //check if city already exists
    var replace = checkRepeat(saveList, city);
    //if there is a repeat remove it from the list from its previous postion
    if( replace !== false)
    {
        saveList.splice(replace, 1);
    }  
    //add object to array
    saveList.push(newCity);
    //set the storage with the updated array
    localStorage.setItem("saveList",JSON.stringify(saveList)); 
    //updates the sidebar in html
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

function toggleCards() 
{
    //checks if there is a repeat and send the index at repeat
    var ind;
    for(var i = 0; i < saveList.length; i++)
    {
        if(saveList[i].city == city)
        {
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

function toggleCards() 
{
    //checks if there is a repeat and send the index at repeat
    var ind;
    for(var i = 0; i < saveList.length; i++)
    {
        if(saveList[i].city == city)
        {
            ind = i;
            return ind;
        }         
    }
    return false;
}

function displaySaveList()
{
    //this function updates the sidebar html
    var $btn = $('<button onclick="w3_close()" class="w3-bar-item w3-large">Close &times;</button>');
    //remove everything in side bar
    $sidebar.children().remove();
    //add the close the button
    $sidebar.append($btn);
    var saveList = [];
    //if the save list isn't empty
    if (localStorage.getItem('saveList') !== null) 
    {
        //get saved listinfo
        saveList = JSON.parse(localStorage.getItem("saveList"));
        //loop until all the list is displayed as buttons
        //is in descending order so the latest item is on top
        for(i = saveList.length; i-- ; i > 0)
        {
            var city = saveList[i].city;
            var $a= $('<a href="#" class="save-item w3-bar-item w3-button">' + city + '</a>');
            //add to list
            $sidebar.append($a);
        } 
    }
}

function toggleCards()
{
    //displays card depinding on checkbox value
    $hotel.toggle(hotelCheck);
    $restaurant.toggle(restaurantCheck);    
    $attraction.toggle(attractionCheck);
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

// API stuff -------------------------------------------------------------------------------------------

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
  fetchWeather(city, 'imperial'); // Pass 'imperial' as the unit parameter for Fahrenheit
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
function fetchWeather(city, unit) {
  var apiKey = '4fe3b9ab993ff0a3ff4a427e9b40def8'; // Replace with your OpenWeatherMap API key
  var units = unit === 'imperial' ? 'imperial' : 'metric'; // Set units to 'imperial' for Fahrenheit, 'metric' for Celsius
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);
      // Clear existing weather info
      $('#weather').empty();
      // Get forecast list
      var forecastList = response.list;
      // Calculate Temperatures
      var dailyAverages = calculateDailyAverages(forecastList);
      // Loop through the Temperatures and create weather cards
      for (var i = 0; i < dailyAverages.length; i++) {
        var date = dailyAverages[i].date;
        var averageTemperature = dailyAverages[i].averageTemperature;
        var iconCode = dailyAverages[i].iconCode;
        var card = createWeatherCard(date, averageTemperature, iconCode, unit);
        $('#weather').append(card);
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

// Function to calculate Temperatures
function calculateDailyAverages(forecastList) {
  var dailyAverages = [];
  var currentDate = null;
  var dailyTemperatures = [];
  var dailyIcons = [];
  // Loop through the forecast data
  for (var i = 0; i < forecastList.length; i++) {
    var forecast = forecastList[i];
    var forecastDate = new Date(forecast.dt_txt.split(' ')[0]);
    // If it's a new date, calculate the Temperature
    if (currentDate === null || currentDate.getTime() !== forecastDate.getTime()) {
      if (currentDate !== null) {
        var averageTemperature = calculateAverageTemperature(dailyTemperatures);
        dailyAverages.push({ date: currentDate, averageTemperature: averageTemperature, iconCode: dailyIcons[0] });
        dailyIcons = [];
      }
      currentDate = forecastDate;
      dailyTemperatures = [forecast.main.temp];
      dailyIcons.push(forecast.weather[0].icon);
    } else {
      dailyTemperatures.push(forecast.main.temp);
      dailyIcons.push(forecast.weather[0].icon);
    }
  }
  // Calculate the average temperature for the last day
  var averageTemperature = calculateAverageTemperature(dailyTemperatures);
  dailyAverages.push({ date: currentDate, averageTemperature: averageTemperature, iconCode: dailyIcons[0] });
  return dailyAverages;
}

// Function to calculate average temperature
function calculateAverageTemperature(temperatures) {
  var sum = 0;
  for (var i = 0; i < temperatures.length; i++) {
    sum += temperatures[i];
  }
  return sum / temperatures.length;
}

// Function to create a weather card element
function createWeatherCard(date, temperature, iconCode, unit) {
  var card = $('<div>').addClass('weather-card');
  var formattedDate = formatDate(date);
  var temperatureText;
  if (unit === 'imperial') {
    temperatureText = 'Temperature: ' + Math.round(temperature) + ' °F'; // Display temperature in Fahrenheit
  } else if (unit === 'metric') {
    temperatureText = 'Temperature: ' + Math.round(temperature) + ' °C'; // Display temperature in Celsius
  } else {
    temperatureText = 'Temperature: ' + Math.round(temperature) + ' K'; // Display temperature in Kelvin
  }
  var dateElement = $('<p>').text(formattedDate);
  var temperatureElement = $('<p>').text(temperatureText);
  var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`; // Icon URL
  var iconElement = $('<img>').attr('src', iconUrl);
  card.append(dateElement);
  card.append(temperatureElement);
  card.append(iconElement);
  return card;
}

// Function to format date in "Weekday, Month Day" format
function formatDate(date) {
  var options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

    //store save on button click
    $save.on("click", save);
    $sidebar.on("click",'.save-item', searchAgain);

});

function searchAgain()
{
    //gets the city that was pressed
    city =  $(this).text();
    console.log("city pressed: " + city);
    toggleCards();
    fetchResults();
    //save again
    save();
}


function save()
{
    //this function saves the current loaction into the local stroage
    if(city == '')
        return;
    //init array
    var saveList = [];
    //checks if the local storage has stuff and if it does the save List is the storage
    if (localStorage.getItem('saveList') !== null) 
    {
        saveList = JSON.parse(localStorage.getItem("saveList"));
    }
    
    //create new JSON object
    var newCity = new saveCity(city);
    //check if city already exists
    var replace = checkRepeat(saveList, city);
    //if there is a repeat remove it from the list from its previous postion
    if( replace !== false)
    {
        saveList.splice(replace, 1);
    }  
    //add object to array
    saveList.push(newCity);
    //set the storage with the updated array
    localStorage.setItem("saveList",JSON.stringify(saveList)); 
    //updates the sidebar in html
    displaySaveList();

}

function checkRepeat(saveList, city)
{
    //checks if there is a repeat and send the index at repeat
    var ind;
    for(var i = 0; i < saveList.length; i++)
    {
        if(saveList[i].city == city)
        {
            ind = i;
            return ind;
        }         
    }
    return false;
}

function displaySaveList()
{
    //this function updates the sidebar html
    var $btn = $('<button onclick="w3_close()" class="w3-bar-item w3-large">Close &times;</button>');
    //remove everything in side bar
    $sidebar.children().remove();
    //add the close the button
    $sidebar.append($btn);
    var saveList = [];
    //if the save list isn't empty
    if (localStorage.getItem('saveList') !== null) 
    {
        //get saved listinfo
        saveList = JSON.parse(localStorage.getItem("saveList"));
        //loop until all the list is displayed as buttons
        //is in descending order so the latest item is on top
        for(i = saveList.length; i-- ; i > 0)
        {
            var city = saveList[i].city;
            var $a= $('<a href="#" class="save-item w3-bar-item w3-button">' + city + '</a>');
            //add to list
            $sidebar.append($a);
        } 
    }
}



function toggleCards()
{
    // get values from checkboxes
    hotelCheck = $hotelCheck.is(":checked");
    restaurantCheck = $restaurantCheck.is(":checked");
    attractionCheck = $attractionCheck.is(":checked");
    //displays card depinding on checkbox value
    $hotel.toggle(hotelCheck);
    $restaurant.toggle(restaurantCheck);    
    $attraction.toggle(attractionCheck);
    //check inputs in console
    console.log("hotel check: " + hotelCheck);
    console.log("restaurant check: " + restaurantCheck);
    console.log("attractions check: " + attractionCheck);
    //warning
    // checks to see if at least one checkbox is checked 
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

//side bar functions-----------------------------
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
//end of sidebar

//API stuff

function fetchResults()
{
  console.log("city in fetch Results " + city);
  // Fetch hotels using Google Places API
  if (hotelCheck) {
    fetch(city,'hotel');
  }
  if (restaurantCheck) {
    fetch(city, 'restaurant');
  }
  if (attractionCheck) {
    fetch(city, 'attraction');
  }
}

// Fetch hotels using Google Places API
function fetch(city, type) {
  var request = {
    query: type +'s in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
  };
  console.log('type: ' + type);
  var service = new google.maps.places.PlacesService(document.createElement('div'));
  console.log(service);
  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $('#'+type).empty(); // Clear existing hotels

      // Loop through the results and create hotel cards
      var userSearch = 0; // this is to keep track of the number of results.
      results.forEach(function (result) {
        if (userSearch < 5) { // Limit to X amount of results results
          var card = createCard(result,type);
          $('#'+type).append(card);
          userSearch++;
        } else {
          return; // Exit the loop once X results have been added
        }
      });
    }
  });
}

// Function to create a attraction card element
function createCard(results, type) {
  var card = $('<div>').addClass(type+'-card');
  var name = $('<h3>').text(results.name);
  var address = $('<p>').text(results.formatted_address);
  var rating = $('<p>').text('Rating: ' + results.rating);
  var photo = $('<img>');

  if (results.photos && results.photos.length > 0) {
    photo.attr('src', results.photos[0].getUrl({ maxWidth: 300, maxHeight: 200 }));
  } else {
    photo.attr('src', 'placeholder.jpg'); // Placeholder image if no photo available
  }

  card.append(name);
  card.append(address);
  card.append(rating);
  card.append(photo);

  return card;
}