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
const apiKey = '4fe3b9ab993ff0a3ff4a427e9b40def8';

<<<<<<< HEAD
// weather API key
const apiKey = '4fe3b9ab993ff0a3ff4a427e9b40def8';
 

$( function () 
{
    $search.submit( function(event)
    {
        event.preventDefault();
        // get city name
        city = $input.val();
        // clear text area and give it a placeholder
        $input.val('');
        $input.attr('placeholder','Enter a city');
        // get values from checkboxes
        hotelCheck = $hotelCheck.is(":checked");
        restaurantCheck = $restaurantCheck.is(":checked");
        attractionCheck = $attractionCheck.is(":checked");
        //check inputs in console
        console.log("user input: " + city);
        console.log("hotel check: " + hotelCheck);
        console.log("restaurant check: " + restaurantCheck);
        console.log(" attractions check: "+ attractionCheck);
    });
=======
$(function () {
  // Autocomplete for user search input
  var autocompleteService = new google.maps.places.AutocompleteService();
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
  });
>>>>>>> 8a0ce45005f1ad2ad44a4e3570b7d76387360f7c

});

function toggleCards() {
  // displays card depending on checkbox value
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

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
