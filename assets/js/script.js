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

    //store save on button click
    $save.on("click",function(event)
    {
        //init array
        var saveList = [];
        console.log("city in save button " + city);
        //checks if the local storage has stuff and if it does the save List is the storage
        if (localStorage.getItem('saveList') !== null) 
        {
            saveList = JSON.parse(localStorage.getItem("saveList"));
        }
        if(city !== '')
        {
            //create new JSON object
            var newCity = new saveCity(city);
            //add object to array
            saveList.push(newCity);
            console.log("saving this city: " + saveList);
            //set the storage with the updated array
            localStorage.setItem("saveList",JSON.stringify(saveList)); 
        }
        displaySaveList();
        
    })

});

function toggleCards() 
{
  // displays card depending on checkbox value
  $hotel.toggle(hotelCheck);
  $restaurant.toggle(restaurantCheck);
  $attraction.toggle(attractionCheck);

}

function displaySaveList()
{
    var $sidebar = $('#mySidebar');
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
            console.log("city in side bar: "+ city);
            var $a= $('<a href="#" class="w3-bar-item w3-button">' + city + '</a>');
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

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
