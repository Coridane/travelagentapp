// init variables
var $search = $('#search');
var $input = $('#input');
// html element checkboxes /// need to add the the element ids
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
// loaction varible used in js
var city;
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
        console.log("attractions check: " + attractionCheck);
        //call display cards
        toggleCards();
    });

});

function toggleCards()
{
    //displays card depinding on checkbox value
    $hotel.toggle(hotelCheck);
    $restaurant.toggle(restaurantCheck);    
    $attraction.toggle(attractionCheck);
}

// Loop for team logo video
document.getElementById('video').addEventListener('ended',myHandler,false);
function myHandler(e) {
    console.log('ended');
    setTimeout(function(){
        document.getElementById('video').play();
    }, 2000);
}