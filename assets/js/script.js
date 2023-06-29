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
        //call display cards
        toggleCards();
    });

});


function toggleCards()
{
    //hotel check
    if(hotelCheck === true) //show card if checked
    {
        $hotel.attr('class', 'display');
        $hotel.attr('style','display: block;');
    }
    else
    {
        $hotel.attr('class', 'hidden');
        $hotel.attr('style','display: none;');
    }
    //restaurant
    if(restaurantCheck === true) //show card if checked
    {
        $restaurant.attr('class', 'display');
        $restaurant.attr('style','display: block;');
    }
    else
    {
        $restaurant.attr('class', 'hidden');
        $restaurant.attr('style','display: none;');
    }
    //attraction check
    if(attractionCheck === true) //show card if checked
    {
        $attraction.attr('class', 'display');
        $attraction.attr('style','display: block;');
    }
    else
    {
        $attraction.attr('class', 'hidden');
        $attraction.attr('style','display: none;');
    }
}

// Loop for team logo video
document.getElementById('video').addEventListener('ended',myHandler,false);
function myHandler(e) {
    console.log('ended');
    setTimeout(function(){
        document.getElementById('video').play();
    }, 2000);
}