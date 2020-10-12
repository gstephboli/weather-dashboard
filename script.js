$(document).ready(function () {
  console.log("this is working");
  // DOM Variables
  var cityName = document.getElementById("city-input");
  var city = "";
  // JS Variables
  moment().format("L");

  // Function Definitions
  function searchCity() {
    city = cityName.value;
    // citySearch = $(".form-control").val();
    console.log(city);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=64e3a7c79c8f571f0448e808d7de35f8";

    var queryURLForecast =
      "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=" +
      city +
      "&units=imperial&appid=64e3a7c79c8f571f0448e808d7de35f8";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //   console.log(queryURL);
      var temperature = $("<div></div>");
      temperature.text("Temperature: " + response.main.temp + " ℉");
      $("#current").append(temperature);
      var humidity = $("<div></div>");
      humidity.text("Humidity: " + response.main.humidity + "%");
      $("#current").append(humidity);
      var windSpeed = $("<div></div>");
      windSpeed.text("Wind Speed: " + response.wind.speed + " MPH");
      $("#current").append(windSpeed);

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryURLUV =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=64e3a7c79c8f571f0448e808d7de35f8";
      console.log(lat, lon);

      $.ajax({
        url: queryURLUV,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        console.log(queryURLUV);
        $("#uvindex-display").empty();
        var uviResults = response.value;
        var uviEl = $("<div></div>").text(
          "UV Index: " + response.value
        );
        $("#uvindex-display").html(uviEl);
      });
    });
  }

  // Function Calls

  // Event Listeners
  $("#submitWeather").on("click", function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());
    // getUV($(this).text());
  });
  //   function displayCityInfo() {
  //     var cityName =
  //     APIkey = "1b2f2d7eb094d92e430dbf1d1a519e0b";

  //     queryURL =
  //       "https://api.openweathermap.org/data/2.5/weather?q=" +
  //       cityName +
  //       "&units=imperial" +
  //       "&appid=" +
  //       APIkey;

  //     $.ajax({
  //       url: queryURL,
  //       method: "GET",
  //     }).then(function (response) {
  //       console.log(response);
  //     });
  //   }

  //   function renderButtons() {
  //     $("buttons-view").empty();
  //     for (var i = 0; i < cities.length; i++) {
  //       var a = $("<button>");
  //       a.addClass("city");
  //       a.attr("data-name", cities[i]);
  //       a.text(cities[i]);
  //       $("#buttons-view").append(a);
  //     }
  //   }
});
