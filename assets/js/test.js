// Handle the search function
async function handleSearch() {
  const city = 'London'; // Replace with the desired city

  // Call the Google Places API to get hotel, restaurant, and attraction data

  // Call the OpenWeatherMap API to get the weather forecast for the selected city.
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4fe3b9ab993ff0a3ff4a427e9b40def8`);
    const data = await response.json();
    // Process the weather data
    console.log(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Call the search function
handleSearch();

// Initialize the Google Places API
function initPlacesAPI() {
  // Load the Places API script with a callback
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCX2tCr8NK-xMvsuHHaX6loXxUCZ8iKB7E&libraries=places&callback=initAutocomplete`;
  document.head.appendChild(script);
}

// Initialize autocomplete after the script is loaded
function initAutocomplete() {
  const input = document.getElementById('input');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(['formatted_address', 'geometry']);
  autocomplete.addListener('place_changed', handlePlaceChange);
}

// Handle the place change event
function handlePlaceChange() {
  const place = this.getPlace();
  const location = place.geometry.location;

  // Call the Google Places API to get hotel, restaurant, and event data
  getPlacesData(location);
}

// Call the Google Places API to get hotel, restaurant, and event data
function getPlacesData(location) {
  // Clear the existing data
  clearCards();

  // Call the Google Places API for each type of place
  getPlaces('hotel', location, 'hotels-card');
  getPlaces('restaurant', location, 'restaurants-card');
  getPlaces('event', location, 'events-card');
}

// Call the Google Places API to get places of a specific type
function getPlaces(type, location, cardId) {
  const request = {
    location: location,
    radius: 5000, // Adjust the radius as needed
    type: [type]
  };

  const service = new google.maps.places.PlacesService(document.createElement('div'));
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayPlaces(results, cardId);
    } else {
      console.error('Error fetching places:', status);
    }
  });
}

// Display the places in the respective card
function displayPlaces(places, cardId) {
  const card = document.getElementById(cardId);

  places.forEach(place => {
    const name = place.name;
    const address = place.vicinity;

    const placeElement = document.createElement('div');
    placeElement.classList.add('place');

    const nameElement = document.createElement('h3');
    nameElement.textContent = name;
    placeElement.appendChild(nameElement);

    const addressElement = document.createElement('p');
    addressElement.textContent = address;
    placeElement.appendChild(addressElement);

    card.appendChild(placeElement);
  });
}

// Clear the cards
function clearCards() {
  document.getElementById('hotels-card').innerHTML = '';
  document.getElementById('restaurants-card').innerHTML = '';
  document.getElementById('events-card').innerHTML = '';
}

// Attach event listeners
document.getElementById('search').addEventListener('submit', handlePlaceChange);

// Initialize the Google Places API when the page loads
window.onload = initPlacesAPI;