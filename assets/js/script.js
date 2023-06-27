var $search = $('#search');
var $hotelCheck = $();
var $restrauntCheck = $();
var $attractionCheck = $();

$( function () 
{
    $search.submit( function(event)
    {
        event.preventDefault();
        //get city name
        city = $input.val();
        city = city.replace('+', ' ');
        //clear text area and give it a placeholder
        $input.val('');
        $input.attr('placeholder','enter city');
    });

});