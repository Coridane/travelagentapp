// init variables
var $search = $('#search');
var $input = $('#input');
// html element checkboxes /// need to add the the element ids
var $hotelCheck = $('#hotelCheck');
var $restaurantCheck = $('#restaurantCheck');
var $attractionCheck = $('#attractionCheck');
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
        $input.attr('placeholder','enter city');
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

});