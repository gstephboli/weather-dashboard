$(document).ready(function () {
  console.log("this is working");
  // DOM Variables

  // JS Variables
  var cityName;
  var currentDate;
  var icon;

  var temperature;
  var humidity;
  var windSpeed;
  var uvIndex;

  var cityLon;
  var cityLat;

  // Function Definitions
  function searchCity() {
    cityName = $("#searchCity").val();
    // citySearch = $(".form-control").val();
    console.log(cityName);

    var cityBtn = $("<button>")
      .attr("class", "cityBtn list-group-item list-group-item-action")
      .text(cityName);
    $("#prevSearches").prepend(cityBtn);

    getCityCoords(cityName);
  }

  function getWeatherForecast(lat, lon) {
    var queryForecastURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,alerts&units=imperial&appid=64e3a7c79c8f571f0448e808d7de35f8";

    $.ajax({
      url: queryForecastURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      icon = response.current.weather[0].icon;

      temperature = response.current.temp;
      humidity = response.current.humidity;
      windSpeed = response.current.wind_speed;
      uvIndex = response.current.uvi;

      populateWeatherData(icon, response);
    });
  }

  function getCityCoords(city) {
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=64e3a7c79c8f571f0448e808d7de35f8";

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      cityLat = response.coord.lat;
      cityLon = response.coord.lon;
      currentDate = new Date(response.dt * 1000).toLocaleDateString();
      $("#city-name").text(city + "(" + currentDate + ")");

      getWeatherForecast(cityLat, cityLon);
    });
  }

  function populateWeatherData(weatherIcon, weatherObj) {
    var cityWeatherUrl =
      "http://openweathermap.org/img/wn/" + weatherIcon + ".png";

    $("#weatherIcon").attr("src", cityWeatherUrl);
    $("#temperature").text("Temperature: " + temperature + " ℉");
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#wind-speed").text("Wind Speed: " + windSpeed + "MPH");

    if (uvIndex < 3) {
      $("#city-uvi").html(
        "UB Index: <span class='favorable p-2'>" + uvIndex + "</span>"
      );
    } else if (uvIndex > 6) {
      $("#city-uvi").html(
        "UB Index: <span class='severe p-2'>" + uvIndex + "</span>"
      );
    } else {
      $("#city-uvi").html(
        "UB Index: <span class='moderate p-2'>" + uvIndex + "</span>"
      );
    }

    for (var i = 1; i < weatherObj.daily.length - 2; i++) {
      var dailyDate = new Date(
        weatherObj.daily[i].dt * 1000
      ).toLocaleDateString();

      var dailyIcon =
        "http://openweathermap.org/img/wn/" +
        weatherObj.daily[i].weather[0].icon +
        ".png";

      var dailyTemp = weatherObj.daily[i].temp.day;
      var dailyHumidity = weatherObj.daily[i].humidity;

      createForecastCards(dailyDate, dailyIcon, dailyTemp, dailyHumidity);
    }
  }

  function createForecastCards(date, iconUrl, temp, humidity) {
    var forecastDiv = $("<div>").attr(
      "class",
      "card text-white bg-primary mb-3 p-2"
    );
    var forecastHeader = $("<h5>").attr("class", "card-title").text(date);

    var forecastIcon = $("<img>").attr({
      src: iconUrl,
      class: "forecast-img",
    });

    var forecastTemp = $("<p>")
      .attr("class", "card-text")
      .text("Temp: " + temp + " ℉");
    var forecastHumidity = $("<p>")
      .attr("class", "card-text")
      .text("Humidity: " + humidity + "%");
    forecastDiv.append(
      forecastHeader,
      forecastIcon,
      forecastTemp,
      forecastHumidity
    );
    $(".card-deck").append(forecastDiv);
  }

  $("#search").on("click", function (event) {
    event.preventDefault();
    $(".card-deck").empty();
    searchCity();
  });

  $(document).on("click", ".cityBtn", function () {
    $(".card-deck".empty());
  });
});
