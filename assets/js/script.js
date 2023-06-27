// init variables
var $search = $('#search');
// html element checkboxes /// need to add the the element ids
var $hotelCheck = $();
var $restrauntCheck = $();
var $attractionCheck = $();
// checkbox variables to be used in js
var hotelCheck;
var restrauntCheck;
var attractionCheck;

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
        restrauntCheck = $restrauntCheck.is(":checked");
        attractionCheck = $attractionCheck.is(":checked");
    });

});