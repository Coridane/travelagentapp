// init variables
var $search = $('#search');
var $input = $('#input');
// html element checkboxes /// need to add the element ids
var $hotelCheck = $('#hotelCheck');
var $restaurantCheck = $('#restaurantCheck');
var $attractionCheck = $('#attractionCheck');
//card elements
var $hotel = $('#hotel');
var $restaurant = $('#restaurant');
var $attraction = $('#attraction');
// checkbox variables to be used in js
var hotelCheck;
var restaurantCheck;
var attractionCheck;
// location variable used in js
var city;
const apiKey = 'AIzaSyCX2tCr8NK-xMvsuHHaX6loXxUCZ8iKB7E'; 


$(function () {
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
    //check inputs in console
    console.log("user input: " + city);
    console.log("hotel check: " + hotelCheck);
    console.log("restaurant check: " + restaurantCheck);
    console.log("attractions check: " + attractionCheck);
    //call display cards
    toggleCards();

    // Fetch hotels using Google Places API
    if (hotelCheck) {
      fetchHotels(city);
    }
  });
});


// Autocomplete for user search input
var autocomplete = new google.maps.places.Autocomplete($input[0]);

// use an eventlistener for 'input event
autocomplete.addListener('place_changed', function() {
  var place = autocomplete.getPlace();
  if (place && place.formatted_address) {
    city = place.formatted_address;
  }
});


function toggleCards() {
  //displays card depending on checkbox value
  $hotel.toggle(hotelCheck);
  $restaurant.toggle(restaurantCheck);
  $attraction.toggle(attractionCheck);  
}

// fetch hotels using Google Places API
function fetchHotels(city, maxResults) {  
  var request = {
    query: 'hotels in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
    maxResults: maxResults    
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

// Loop for team logo video
document.getElementById('video').addEventListener('ended', myHandler, false);
function myHandler(e) {
  console.log('ended');
  setTimeout(function () {
    document.getElementById('video').play();
  }, 2000);
}
