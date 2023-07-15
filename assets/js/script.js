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

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=21fb3ec49ce4787c37c1ae85c5364e99&units=imperial";

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
    var cityName = weatherData.city.name;
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
     weatherIconImg.src = 'https://openweathermap.org/img/w/' + weatherIcon + '.png';
     weatherIconImg.alt = 'Weather Icon';
     heading.textContent = cityName + " " + "(" + date + ")" + " ";
 
     // Create div elements to wrap spans
     var temperatureDiv = document.createElement('div');
     var windSpeedDiv = document.createElement('div');
     var humidityDiv = document.createElement('div');
 
     temperatureSpan.textContent = 'Temperature: ' + temperature + '°';
     windSpeedSpan.textContent = 'Wind Speed: ' + windSpeed + ' MPH';
     humiditySpan.textContent = 'Humidity: ' + humidity + '%';
 
     // Append spans to respective div elements
     temperatureDiv.appendChild(temperatureSpan);
     windSpeedDiv.appendChild(windSpeedSpan);
     humidityDiv.appendChild(humiditySpan);
 
     // Append elements to currentWeatherContainer
     heading.appendChild(weatherIconImg);
     currentWeatherContainer.appendChild(heading);
     currentWeatherContainer.appendChild(temperatureDiv);
     currentWeatherContainer.appendChild(windSpeedDiv);
     currentWeatherContainer.appendChild(humidityDiv);
 
     // Process and display 5-day forecast
     var forecastList = weatherData.list;
 
     var forecastRow = document.createElement('div');
     forecastRow.classList.add('row');

    // Looping for 5 days (API provides data every 3 hours)
    for (var i = 7; i < 47; i += 8) {
        var forecast = forecastList[i];
        var forecastCard = document.createElement('div');
        forecastCard.classList.add('card', 'col-md-2');

        var forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
        var forecastIcon = forecast.weather[0].icon;
        var forecastTemperature = forecast.main.temp;
        var windSpeed = forecast.wind.speed;
        var forecastHumidity = forecast.main.humidity;

        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        var forecastDateHeading = document.createElement('h5');
        forecastDateHeading.textContent = forecastDate;

        var forecastIconImg = document.createElement('img');
        forecastIconImg.src = 'https://openweathermap.org/img/w/' + forecastIcon + '.png';
        forecastIconImg.alt = 'Weather Icon';

        var forecastTemperatureDiv = document.createElement('div'); // Wrap forecastTemperatureSpan in a div
        var windSpeedDiv = document.createElement('div'); // Wrap windSpeedSpan in a div
        var forecastHumidityDiv = document.createElement('div'); // Wrap forecastHumiditySpan in a div
        var forecastTemperatureSpan = document.createElement('span');
        var windSpeedSpan = document.createElement('span');
        var forecastHumiditySpan = document.createElement('span');

        forecastTemperatureSpan.textContent = 'Temperature: ' + forecastTemperature + '°';
        windSpeedSpan.textContent = 'Wind Speed: ' + windSpeed + ' MPH';
        forecastHumiditySpan.textContent = 'Humidity: ' + forecastHumidity + '%';

        forecastTemperatureDiv.appendChild(forecastTemperatureSpan);
        windSpeedDiv.appendChild(windSpeedSpan);
        forecastHumidityDiv.appendChild(forecastHumiditySpan);

        cardBody.appendChild(forecastDateHeading);
        cardBody.appendChild(forecastIconImg);
        cardBody.appendChild(forecastTemperatureDiv);
        cardBody.appendChild(windSpeedDiv);
        cardBody.appendChild(forecastHumidityDiv);

        forecastCard.appendChild(cardBody);
        forecastRow.appendChild(forecastCard);
    }

    forecastContainer.appendChild(forecastRow);
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

