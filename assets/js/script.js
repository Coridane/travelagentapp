// init variables
var $search = $('#search');
var $input = $('#input');
var $sidebar = $('#mySidebar');
// html element checkboxes /// need to add the element ids
var $hotelCheck = $('#hotelCheck');
var $restaurantCheck = $('#restaurantCheck');
var $attractionCheck = $('#attractionCheck');
//card elements
var $hotel= $('#hotel');
var $restaurant = $('#restaurant');
var $attraction = $('#attraction');
// checkbox variables to be used in js
var hotelCheck;
var restaurantCheck;
var attractionCheck;
// location variable used in js
var city;
const apiKey = '4fe3b9ab993ff0a3ff4a427e9b40def8';
//city object
var $save = $('#save');
var saveList = [];
var saveCity = function(cty)
{
  this.city = cty;
}

$(function () {
    //displays the save list in the side bar
    displaySaveList();
    // Autocomplete for user search input
    var autocomplete = new google.maps.places.Autocomplete($input[0]);

    // Listen for 'place_changed' event
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (place && place.formatted_address) {
        city = place.formatted_address;
        }
    });

    $search.submit(function (event) {
        event.preventDefault();
        // get city name
        city = $input.val();
        // clear text area and give it a placeholder
        $input.val('');
        $input.attr('placeholder', 'Enter a city');
        // get values from checkboxes
        hotelCheck = $hotelCheck.is(":checked");
        restaurantCheck = $restaurantCheck.is(":checked");
        attractionCheck = $attractionCheck.is(":checked");
        // check inputs in console
        console.log("user input: " + city);
        console.log("hotel check: " + hotelCheck);
        console.log("restaurant check: " + restaurantCheck);
        console.log("attractions check: " + attractionCheck);
        // call display cards
        toggleCards();
        // checks to see if at least one checkbox is checked 
        if (hotelCheck == false && restaurantCheck == false && attractionCheck == false) {
            $('#alert').show();
        } else {
            $('#alert').hide();
        }
        fetchResults();
     });

    //store save on button click
    $save.on("click", save);
    $sidebar.on("click",'.save-item', searchAgain);

});

function searchAgain()
{
    //gets the city that was pressed
    city =  $(this).text();
    console.log("city pressed: " + city);
    //save again
    save();
}


function save()
{
    //this function saves the current loaction into the local stroage
    if(city == undefined)
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
  // Fetch hotels using Google Places API
  if (hotelCheck) {
    fetchHotels(city);
  }
  if (restaurantCheck) {
    fetchRestaurants(city);
  }
  if (attractionCheck) {
    fetchHAttractions(city);
  }
}

// Fetch hotels using Google Places API
function fetchHotels(city) {
  var request = {
    query: 'hotels in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
  };

  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $hotel.empty(); // Clear existing hotels

      // Loop through the results and create hotel cards
      var userSearch = 0; // this is to keep track of the number of results.
      results.forEach(function (result) {
        if (userSearch < 5) { // Limit to X amount of results results
          var hotelCard = createHotelCard(result);
          $hotel.append(hotelCard);
          userSearch++;
        } else {
          return; // Exit the loop once X results have been added
        }
      });
    }
  });
}

// Function to create a hotel card element
function createHotelCard(hotel) {
  var card = $('<div>').addClass('hotel-card');
  var name = $('<h3>').text(hotel.name);
  var address = $('<p>').text(hotel.formatted_address);
  var rating = $('<p>').text('Rating: ' + hotel.rating);
  var photo = $('<img>');

  if (hotel.photos && hotel.photos.length > 0) {
    photo.attr('src', hotel.photos[0].getUrl({ maxWidth: 300, maxHeight: 200 }));
  } else {
    photo.attr('src', 'placeholder.jpg'); // Placeholder image if no photo available
  }

  card.append(name);
  card.append(address);
  card.append(rating);
  card.append(photo);

  return card;
}

// Fetch restaurants using Google Places API
function fetchRestaurants(city) {
  var request = {
    query: 'restaurants in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
  };

  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $restaurant.empty(); // Clear existing restaurant

      // Loop through the results and create retaurant cards
      var userSearch = 0; // this is to keep track of the number of results.
      results.forEach(function (result) {
        if (userSearch < 5) { // Limit to X amount of results results
          var restaurantCard = createRestaurantCard(result);
          $restaurant.append(restaurantCard);
          userSearch++;
        } else {
          return; // Exit the loop once X results have been added
        }
      });
    }
  });
}

// Function to create a restaurant card element
function createRestaurantCard(restaurant) {
  var card = $('<div>').addClass('restaurant-card');
  var name = $('<h3>').text(restaurant.name);
  var address = $('<p>').text(restaurant.formatted_address);
  var rating = $('<p>').text('Rating: ' + restaurant.rating);
  var photo = $('<img>');

  if (restaurant.photos && restaurant.photos.length > 0) {
    photo.attr('src', restaurant.photos[0].getUrl({ maxWidth: 300, maxHeight: 200 }));
  } else {
    photo.attr('src', 'placeholder.jpg'); // Placeholder image if no photo available
  }

  card.append(name);
  card.append(address);
  card.append(rating);
  card.append(photo);

  return card;
}

// Fetch attractions using Google Places API
function fetchHAttractions(city) {
  var request = {
    query: 'hotels in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
  };

  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $attraction.empty(); // Clear existing attractions

      // Loop through the results and create attraction cards
      var userSearch = 0; // this is to keep track of the number of results.
      results.forEach(function (result) {
        if (userSearch < 5) { // Limit to X amount of results results
          var attractionCard = createAttractionCard(result);
          $attraction.append(attractionCard);
          userSearch++;
        } else {
          return; // Exit the loop once X results have been added
        }
      });
    }
  });
}

// Function to create a attraction card element
function createAttractionCard(attraction) {
  var card = $('<div>').addClass('hotel-card');
  var name = $('<h3>').text(attraction.name);
  var address = $('<p>').text(attraction.formatted_address);
  var rating = $('<p>').text('Rating: ' + attraction.rating);
  var photo = $('<img>');

  if (attraction.photos && attraction.photos.length > 0) {
    photo.attr('src', attraction.photos[0].getUrl({ maxWidth: 300, maxHeight: 200 }));
  } else {
    photo.attr('src', 'placeholder.jpg'); // Placeholder image if no photo available
  }

  card.append(name);
  card.append(address);
  card.append(rating);
  card.append(photo);

  return card;
}