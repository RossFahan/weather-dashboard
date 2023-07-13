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


    // make a fetch request to first api
    // . then
    // convert respone to json
    //.then
    //extract coordinates and save them as variable
    // call getWeather

function getWeather(lat, long){   
//add the coordinates to the url as a query parameter

// make a fetch request to first api
// make a fetch request to the first api
// . then
// convert respone to json
//.then
//extract 5 day forecast and current day forcast
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