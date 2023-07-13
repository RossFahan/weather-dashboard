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
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
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
function getWeather(lat, lon) {

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=21fb3ec49ce4787c37c1ae85c5364e99";

    console.log(forecastURL);
    fetch(forecastURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
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

function displayWeather(weatherData) {

    // Clear previous weather data
    currentWeatherContainer.innerHTML = '';
    forecastContainer.innerHTML = '';

    // Variables to store current weather data
    var currentWeather = weatherData.list[0];
    var cityName = currentWeather.name;
    var weatherIcon = currentWeather.weather[0].icon;
    var temperature = currentWeather.main.temp;
    var windSpeed = currentWeather.wind.speed;
    var humidity = currentWeather.main.humidity;
    var date = new Date(currentWeather.dt * 1000).toLocaleDateString();

    console.log(cityName);

    // Create HTML elements
    var heading = document.createElement('h3');
    var weatherIconImg = document.createElement('img');
    var temperatureSpan = document.createElement('span');
    var windSpeedSpan = document.createElement('span');
    var humiditySpan = document.createElement('span');

    // Set inner HTML or text content
    heading.textContent = cityName;
    weatherIconImg.src = 'https://openweathermap.org/img/w/' + weatherIcon + '.png';
    weatherIconImg.alt = 'Weather Icon';
    temperatureSpan.textContent = 'Temperature: ' + temperature + '°';
    windSpeedSpan.textContent = 'Wind Speed: ' + windSpeed + ' MPH';
    humiditySpan.textContent = 'Humidity: ' + humidity + '%';

    // Append elements to currentWeatherContainer
    currentWeatherContainer.appendChild(heading);
    currentWeatherContainer.appendChild(weatherIconImg);
    currentWeatherContainer.appendChild(temperatureSpan);
    currentWeatherContainer.appendChild(humiditySpan);
    currentWeatherContainer.appendChild(windSpeedSpan);

    // Process and display 5-day forecast
}

function loadSearchHistory() {
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