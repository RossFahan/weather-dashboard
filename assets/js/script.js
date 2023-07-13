//global variables
//var repoNameEl = document.querySelector('#repo-name');
//var issueContainerEl = document.querySelector('#issues-container');
//var limitWarningEl = document.querySelector('#limit-warning');

//var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct"

// current date variable

//request urls for apis

//html (query) selectors
//variable for search
//vairable for search input field
//var searchButtonEl = document.querySelector('#id')

//functions

// search 
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
}

function loadSearchHistory(){
    // find searched cities in localStorage
    // display them
    //creating button adding to page
}

//event listener for submit form and button input (submit button for form)
//event listener for previous search buttons



getCoordinates("Denver");

// //some different options

// var formEl = document.querySelector("#form")

// formEl.addEventListener("submit", function() {
//     //do something
// })

// function formHandler(){
// //do some stuff what city was typed call get coordinates

// }

// formEl.addEventListener("submit", formHandler)