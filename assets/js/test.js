// init variables
var $search = $('#search');
var $input = $('#input');
// html element checkboxes /// need to add the element ids
var $hotelCheck = $('#hotelCheck');
var $restaurantCheck = $('#restaurantCheck');
var $attractionCheck = $('#attractionCheck');
// card elements
var $hotel = $('#hotel');
var $restaurant = $('#restaurant');
var $attraction = $('#attraction');
// checkbox variables to be used in js
var hotelCheck;
var restaurantCheck;
var attractionCheck;
// location variable used in js
var city;
const apiKey = 'YOUR_API_KEY';

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
    // call display cards
    toggleCards();

    // Fetch hotels using Google Places API
    if (hotelCheck) {
      fetchHotels(city, 5); // Limiting to 5 results
    }

    // Fetch restaurants using Google Places API
    if (restaurantCheck) {
      fetchRestaurants(city, 5); // Limiting to 5 results
    }

    // Fetch attractions using Google Places API
    if (attractionCheck) {
      fetchAttractions(city, 5); // Limiting to 5 results
    }
  });
});

// autocomplete for user search
var autocomplete = new google.maps.places.Autocomplete($input[0]);

// use an event listener for 'place_changed' event
autocomplete.addListener('place_changed', function () {
  var place = autocomplete.getPlace();
  if (place && place.formatted_address) {
    city = place.formatted_address;
  }
});

<<<<<<< HEAD
=======

// Autocomplete for user search input
var autocomplete = new google.maps.places.Autocomplete($input[0]);

// use an eventlistener for 'input event
autocomplete.addListener('place_changed', function() {
  var place = autocomplete.getPlace();
  if (place && place.formatted_address) {
    city = place.formatted_address;
  }
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


// Autocomplete for user search input
var autocomplete = new google.maps.places.Autocomplete($input[0]);

// use an eventlistener for 'input event
autocomplete.addListener('place_changed', function() {
  var place = autocomplete.getPlace();
  if (place && place.formatted_address) {
    city = place.formatted_address;
  }
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


>>>>>>> 5bccbd38792a9505dcd346fa8091787693a81017
function toggleCards() {
  // displays card depending on checkbox value
  $hotel.toggle(hotelCheck);
  $restaurant.toggle(restaurantCheck);
  $attraction.toggle(attractionCheck);
}

<<<<<<< HEAD
// Fetch hotels using Google Places API
function fetchHotels(city, limit) {
=======
// fetch hotels using Google Places API
function fetchHotels(city, maxResults) {  
>>>>>>> 5bccbd38792a9505dcd346fa8091787693a81017
  var request = {
    query: 'hotels in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
    maxResults: maxResults    
  };

  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $hotel.empty(); // Clear existing hotels

      // loops through the results and create hotel results
      var count = 0; // count tracks the number of results
      results.forEach(function (result) {
        if (count < limit) {
          var hotelCard = createHotelCard(result);
          $hotel.append(hotelCard);
          count++;
        } else {
          return; // Exit the loop once the limit is reached
        }
      });
    }
  });
}

// Fetch restaurants using Google Places API
function fetchRestaurants(city, limit) {
  var request = {
    query: 'restaurants in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
  };

  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $restaurant.empty(); // clear existing restaurants

      var count = 0; 
      results.forEach(function (result) {
        if (count < limit) {
          var restaurantCard = createRestaurantCard(result);
          $restaurant.append(restaurantCard);
          count++;
        } else {
          return; 
        }
      });
    }
  });
}

// fetch attractions using Google Places API
function fetchAttractions(city, limit) {
  var request = {
    query: 'attractions in ' + city,
    fields: ['name', 'formatted_address', 'rating', 'photos'],
  };

  var service = new google.maps.places.PlacesService(document.createElement('div'));
  service.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $attraction.empty(); // Clear existing attractions

      var count = 0;
      results.forEach(function (result) {
        if (count < limit) {
          var attractionCard = createAttractionCard(result);
          $attraction.append(attractionCard);
          count++;
        } else {
          return; 
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
    // Placeholder image if no photo available
    photo.attr('src', 'placeholder.jpg'); 
  }

  card.append(name);
  card.append(address);
  card.append(rating);
  card.append(photo);

  return card;
}

// function to create an attraction card element
function createAttractionCard(attraction) {
  var card = $('<div>').addClass('attraction-card');
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
