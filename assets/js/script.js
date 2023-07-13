// Search form and input
var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');

// Elements for displaying weather data
var currentWeatherContainer = document.getElementById('current-weather');
var forecastContainer = document.getElementById('forecast');



// search function
function getCoordinates(city) {
    // add the city to the URL as a query parameter
    var geocodingURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=21fb3ec49ce4787c37c1ae85c5364e99";
  
    fetch(geocodingURL)
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            // convert coordinates
            console.log(data);
            // getWeather(lat, long);
            getWeather(data[0].lat, data[0].lon);
            //console.log(data[0].lat + " " + data[0].lon);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeatherMap');
      });
      ;
  }

//get weather using lat and long
function getWeather(lat, lon){   

var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=21fb3ec49ce4787c37c1ae85c5364e99";
  
console.log(forecastURL);
fetch(forecastURL)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        // log data
        console.log(data);
        //extract 5 day forecast and current day forcast
        displayWeather(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to OpenWeatherMap');
  });
  ;
}

function displayWeather(weatherData){
//make weather data appear (text content append etc)

  // Clear previous weather data
  currentWeatherContainer.innerHTML = '';
  forecastContainer.innerHTML = '';

  // Process and display current weather
    var currentWeather = weatherData.list[0];
    var cityName = currentWeather.name;
    var temperature = currentWeather.main.temp;
    var weatherIcon = currentWeather.weather[0].icon;
    var humidity = currentWeather.main.humidity;
    var windSpeed = currentWeather.wind.speed;

  // Process and display 5-day forecast
}

function loadSearchHistory(){
    // find searched cities in localStorage
    // display them
    //creating button adding to page
}

//event listener for search form
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var city = searchInput.value.trim();
    if (city) {
      getCoordinates(city);
      searchInput.value = '';
    }
  });


//event listener for previous search buttons